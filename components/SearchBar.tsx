import { useState } from "https://esm.sh/preact@10.13.1/hooks";
import { ComponentProps } from "preact";

type SearchBarProps = ComponentProps<"input"> & {
  onClear?: () => void;
};

export function SearchBar(props: SearchBarProps) {
  const [value, setValue] = useState("");

  function onInput(e: Parameters<NonNullable<ComponentProps<"input">["onInput"]>>[0]) {
    setValue(e.currentTarget.value);
    props.onInput?.(e);
  }

  function onClear() {
    setValue("");
    props.onClear?.();
  }

  const hasValue = value.trim().length > 0;

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onInput={onInput}
        placeholder="Search..."
        className="w-full py-2 px-4 pr-12 border
        border-text-tertiary bg-background-secondary text-text-primary rounded-lg"
      />
      <div className="absolute top-0 right-0 h-full px-3 flex items-center">
        <button
          disabled={!hasValue}
          onClick={onClear}
          className={`text-text-secondary transition-all duration-200
          ${hasValue ? "hover:text-red-500 cursor-pointer" : "cursor-auto"}`}
        >
          {hasValue ? <CloseIcon /> : <SearchIcon />}
        </button>
      </div>
    </div>
  );
}

// Internal sub-components -----------------------------------------------------

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
  );
}