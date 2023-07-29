import { PostWithoutContent } from '@utils/posts.ts';
import { useReducer } from 'https://esm.sh/preact@10.13.1/hooks';

import { PostPreview, SearchBar } from '../components/index.ts';

// ToDo: Refactor this component, clear the code and make it more readable.

export default function PostSearch(props: { posts: PostWithoutContent[]; }) {
  const [state, dispatch] = useReducer(searchReducer, buildInitialReducerState(props.posts));
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
          {state.tags.map(({ tag, isSelected }) => (
            <button
              className={`px-4 py-2 rounded-lg transition-all duration-200 mr-2 mb-2
              bg-background-secondary hover:bg-primary hover:text-white
              ${isSelected
                  ? 'text-white border border-primary'
                  : 'text-text-primary border border-background-secondary'}`}
              onClick={() => dispatch({ type: 'TAG_CLICK', tag })}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-5 mt-5">
        {state.filteredPosts.map(post => <PostPreview {...post} />)}
      </div>
    </div>
  );
}

// Reducer ---------------------------------------------------------------------

function searchReducer(state: State, action: Action) {
  switch (action.type) {
    case 'TOGGLE_TAGS':
      return { ...state, isTagsVisible: action.state };
    case 'CLEAR_QUERY':
      return { ...state, query: '', isQueryEmpty: true, ...updatePosts('', state.tags) };
    case 'TAG_CLICK': {
      const tags = handleTagClick(action.tag);
      return { ...state, ...action, ...updatePosts(state.query, tags), tags };
    }
    case 'UPDATE_QUERY':
      return { ...state, ...action, ...isQueryEmpty(action.query), ...updatePosts(action.query) };
  }

  function isQueryEmpty(query: string) {
    return { isQueryEmpty: query.trim().length === 0 };
  }

  function getFilteredPosts(query: string, tags?: Tag[]) {
    if (!query && !tags) return [];
    const result = state.posts.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.snippet.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    if (!tags) return result;
    const selectedTags = getSelectedTags(tags);
    return filterPostsByTags(result, selectedTags);
  }

  function updatePosts(query: string, tags?: Tag[]) {
    const filteredPosts = getFilteredPosts(query, tags);
    return { filteredPosts, noPostsFound: filteredPosts.length === 0 };
  }
  function handleTagClick(tag: string) {
    const tags = state.tags.map(({ tag: _tag, isSelected }) => ({
      tag: _tag,
      isSelected: _tag === tag ? !isSelected : isSelected,
    }));
    setTagsToUrl(getSelectedTags(tags));
    return tags;
  }
}

function buildInitialReducerState(posts: PostWithoutContent[]) {
  const tags = getInitialTags(posts);
  const selectedTags = getSelectedTags(tags);
  return {
    posts,
    query: '',
    isQueryEmpty: true,
    noPostsFound: false,
    tags: getInitialTags(posts),
    isTagsVisible: selectedTags.length > 0,
    filteredPosts: filterPostsByTags(posts, selectedTags),
  };
}

// Helpers ---------------------------------------------------------------------

function getTagsFromUrl() {
  if (!window?.location) return [];
  const url = new URL(window.location.href);
  const tags = url.searchParams.get('tags');
  if (tags === null) return [];
  return tags.split(',');
}

function setTagsToUrl(tags: string[]) {
  if (!window?.location) return;
  const url = new URL(window.location.href);
  url.searchParams.set('tags', tags.join(','));
  window.history.pushState({}, '', url.toString());
  if (tags.length === 0) return url.searchParams.delete('tags');
}

function getTagsFromPosts(posts: PostWithoutContent[]) {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}

function getInitialTags(posts: PostWithoutContent[]) {
  const tags = getTagsFromPosts(posts);
  const tagsFromUrl = getTagsFromUrl();
  return tags.map(tag => ({ tag, isSelected: tagsFromUrl.includes(tag) }));
}

function filterPostsByTags(posts: PostWithoutContent[], tags: string[]) {
  return posts.filter(post => tags.every(tag => post.tags.includes(tag)));
}

function getSelectedTags(tags: Tag[]) {
  return tags.filter(tag => tag.isSelected).map(tag => tag.tag);
}

// Types -----------------------------------------------------------------------

type Tag = { tag: string; isSelected: boolean; };

type State = {
  query: string;
  posts: PostWithoutContent[];
  tags: Tag[];
  filteredPosts: PostWithoutContent[];
  isQueryEmpty: boolean;
  noPostsFound: boolean;
  isTagsVisible: boolean;
};

type Action =
  | { type: 'CLEAR_QUERY'; }
  | { type: 'UPDATE_QUERY', query: string; }
  | { type: 'TOGGLE_TAGS', state: boolean; }
  | { type: 'TAG_CLICK', tag: string; };