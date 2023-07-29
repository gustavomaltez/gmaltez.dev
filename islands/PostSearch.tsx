import { PostWithoutContent } from '@utils/posts.ts';
import { useReducer } from 'https://esm.sh/preact@10.13.1/hooks';

import { PostPreview, SearchBar } from '../components/index.ts';
import { sortAlphabetically } from "@utils/strings.ts";

export default function PostSearch(props: { posts: PostWithoutContent[]; }) {
  const [state, dispatch] = useReducer(searchReducer, buildInitialReducerState(props.posts));

  function onTagClick({ tag }: Tag) {
    dispatch({ type: 'TAG_CLICK', tag });
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col mobile-high:flex-row w-full">
        <SearchBar
          onClear={() => dispatch({ type: 'CLEAR_QUERY' })}
          onInput={e => dispatch({ type: 'UPDATE_QUERY', query: e.currentTarget.value.toLowerCase() })}
        />
        <button
          className="basis-1/5 mt-2 mobile-high:mt-0 mobile-high:ml-2 bg-primary 
          text-white px-4 py-2 rounded-lg outline-none min-w-[120px]"
          onClick={() => dispatch({ type: 'TOGGLE_TAGS', state: !state.isTagsVisible })}
        >
          {state.isTagsVisible ? 'Hide Tags' : 'Show Tags'}
        </button>
      </div>
      {state.isTagsVisible && (
        <div className="flex flex-row flex-wrap mt-2 justify-center">
          {state.tags.map(tag => (<TagItem {...tag} onClick={() => onTagClick(tag)} />))}
        </div>
      )}
      <div className="flex flex-col gap-5 mt-5">
        {state.filteredPosts.map(post => <PostPreview {...post} />)}
      </div>
    </div >
  );
}

// Sub-components --------------------------------------------------------------

function TagItem(props: Tag & { onClick: () => void; }) {
  return (
    <button
      className={`px-3 py-1 rounded-lg transition-all duration-200 mr-2 mb-2 border 
      ${props.isSelected ? 'text-white border-primary' : 'text-text-primary border-background-secondary'}`}
      onClick={props.onClick}
      onMouseEnter={e => e.currentTarget.classList.add('bg-primary', 'text-white')}
      onMouseLeave={e => e.currentTarget.classList.remove('bg-primary', 'text-white')}
    >
      {props.tag}
    </button>
  );
}

// Reducer ---------------------------------------------------------------------

function buildInitialReducerState(posts: PostWithoutContent[]) {
  const tags = getInitialTags(posts);
  const selectedTags = getSelectedTags(tags);
  return {
    posts,
    query: '',
    filteredPosts: [],
    isQueryEmpty: true,
    noPostsFound: false,
    tags: getInitialTags(posts),
    isTagsVisible: selectedTags.length > 0,
  };
}

function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case 'TOGGLE_TAGS':
      return { ...state, isTagsVisible: action.state };
    case 'TAG_CLICK': {
      const { tags } = updateTagsByClick(state.tags, action.tag);
      return { ...state, ...updatePosts(state.posts, state.query, tags), tags };
    }
    case 'CLEAR_QUERY':
      return { ...state, query: '', isQueryEmpty: true, ...updatePosts(state.posts, '', state.tags) };
    case 'UPDATE_QUERY':
      return { ...state, ...action, ...isQueryEmpty(action.query), ...updatePosts(state.posts, action.query) };
  }
}

// Helpers ---------------------------------------------------------------------

// Tags -----

function updateTagsByClick(tags: Tag[], clickedTag: string) {
  const updatedTags = tags.map(tag => {
    if (tag.tag !== clickedTag) return tag;
    return { ...tag, isSelected: !tag.isSelected };
  });
  setTagsToUrl(getSelectedTags(updatedTags));
  return { tags: updatedTags };
}

function getSelectedTags(tags: Tag[]) {
  return tags.filter(tag => tag.isSelected).map(tag => tag.tag);
}

function setTagsToUrl(tags: string[]) {
  if (!window?.location) return;
  const url = new URL(window.location.href);
  if (tags.length === 0) url.searchParams.delete('tags');
  else url.searchParams.set('tags', tags.join(','));
  window.history.pushState({}, '', url.toString());
}

function getTagsFromUrl() {
  if (!window?.location) return [];
  const url = new URL(window.location.href);
  const tags = url.searchParams.get('tags');
  if (tags === null) return [];
  return tags.split(',');
}

function getInitialTags(posts: PostWithoutContent[]) {
  const tags = getTagsFromPosts(posts);
  const tagsFromUrl = getTagsFromUrl();
  return tags.map(tag => ({ tag, isSelected: tagsFromUrl.includes(tag) }));
}

function getTagsFromPosts(posts: PostWithoutContent[]) {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return sortAlphabetically(Array.from(tags));
}

// Posts -----

function getFilteredPosts(posts: PostWithoutContent[], query: string, tags?: Tag[]) {
  const selectedTags = tags ? getSelectedTags(tags) : undefined;
  const hasTags = selectedTags?.length;
  if (!query && !hasTags) return [];
  const result = posts.filter(
    post =>
      post.title.toLowerCase().includes(query) ||
      post.snippet.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
  );
  return hasTags ? filterPostsByTags(result, selectedTags) : result;
}

function updatePosts(posts: PostWithoutContent[], query: string, tags?: Tag[]) {
  const filteredPosts = getFilteredPosts(posts, query, tags);
  return { filteredPosts, noPostsFound: filteredPosts.length === 0 };
}

function filterPostsByTags(posts: PostWithoutContent[], tags: string[]) {
  return posts.filter(post => tags.every(tag => post.tags.includes(tag)));
}

// Query -----

function isQueryEmpty(query: string) {
  return { isQueryEmpty: query.trim().length === 0 };
}

// Types -----------------------------------------------------------------------

type Tag = { tag: string; isSelected: boolean; };

type State = {
  query: string;
  tags: Tag[];
  isQueryEmpty: boolean;
  noPostsFound: boolean;
  isTagsVisible: boolean;
  posts: PostWithoutContent[];
  filteredPosts: PostWithoutContent[];
};

type Action =
  | { type: 'CLEAR_QUERY'; }
  | { type: 'UPDATE_QUERY', query: string; }
  | { type: 'TOGGLE_TAGS', state: boolean; }
  | { type: 'TAG_CLICK', tag: string; };