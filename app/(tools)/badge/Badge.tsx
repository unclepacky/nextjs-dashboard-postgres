import {
  BadgeCategory,
  BadgeType,
  FontType,
  categoryToColor,
  typeToRound,
} from './defenition';

interface BadgeProps {
  type: BadgeType;
  category: BadgeCategory;
  content: string;
  bordered?: BadgeType;
  large?: BadgeType;
  className?: string;
}

export default function Badge({
  type,
  category,
  content,
  bordered,
  large,
  className,
}: BadgeProps) {
  const round = typeToRound[type];
  const color = categoryToColor[category];
  const border = bordered ? typeToRound[bordered] : '';
  const largeFont = large
    ? (typeToRound[large] as FontType)
    : { size: '0.75rem', height: '1rem' };
  return (
    // <div className="flex flex-col gap-10">
    <div>
      {/* <div>
        <span className="block">BORDERED BADGE</span>

        <span className="me-2 rounded border border-blue-400 bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-gray-700 dark:text-blue-400">
          Default
        </span>
        <span className="me-2 rounded border border-gray-500 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-400">
          Dark
        </span>
        <span className="me-2 rounded border border-red-400 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-gray-700 dark:text-red-400">
          Red
        </span>
        <span className="me-2 rounded border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-400">
          Green
        </span>
        <span className="me-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300">
          Yellow
        </span>
        <span className="me-2 rounded border border-indigo-400 bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-gray-700 dark:text-indigo-400">
          Indigo
        </span>
        <span className="me-2 rounded border border-purple-400 bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-gray-700 dark:text-purple-400">
          Purple
        </span>
        <span className="me-2 rounded border border-pink-400 bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-gray-700 dark:text-pink-400">
          Pink
        </span>
      </div>
      <div>
        <span className="block">PILLS BADGE</span>

        <span className="me-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          Default
        </span>
        <span className="me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          Dark
        </span>
        <span className="me-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
          Red
        </span>
        <span className="me-2 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Green
        </span>
        <span className="me-2 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          Yellow
        </span>
        <span className="me-2 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
          Indigo
        </span>
        <span className="me-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
          Purple
        </span>
        <span className="me-2 rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
          Pink
        </span>
      </div>
      <div>
        <span className="block">LARGE BADGES</span>

        <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          Default
        </span>
        <span className="me-2 rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          Dark
        </span>
        <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
          Red
        </span>
        <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Green
        </span>
        <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          Yellow
        </span>
        <span className="me-2 rounded bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
          Indigo
        </span>
        <span className="me-2 rounded bg-purple-100 px-2.5 py-0.5 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
          Purple
        </span>
        <span className="me-2 rounded bg-pink-100 px-2.5 py-0.5 text-sm font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
          Pink
        </span>
      </div>
      <div>
        <span className="block">DEFAULT</span>

        <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          Default
        </span>
        <span className="me-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          Dark
        </span>
        <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
          Red
        </span>
        <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          Green
        </span>
        <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          Yellow
        </span>
        <span className="me-2 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
          Indigo
        </span>
        <span className="me-2 rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
          Purple
        </span>
        <span className="me-2 rounded bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800 dark:bg-pink-900 dark:text-pink-300">
          Pink
        </span>
      </div> */}
      {/* <div>{largeFont}</div> */}
      <span
        className={`me-2 border-[${border}] border-${color}-400 rounded-[${round}] bg-${color}-100 px-2.5 py-0.5  text-[${largeFont.size}] font-medium leading-[${largeFont.height}] text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300 ${className}`}
      >
        {content}
      </span>
    </div>
  );
}
{
  /* <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */
}
