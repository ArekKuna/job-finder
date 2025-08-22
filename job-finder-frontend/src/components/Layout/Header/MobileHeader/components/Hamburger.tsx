type Props = {
  onClick: () => void;
};

export const Hamburger = ({ onClick }: Props) => {
  return (
    <button
      className="flex flex-col gap-1 cursor-pointer p-4 rounded-lg hover:bg-jf-warm-gray-200"
      onClick={onClick}
    >
      <span className="h-[2px] w-[20px] bg-black rounded-lg" />
      <span className="h-[2px] w-[20px] bg-black rounded-lg" />
      <span className="h-[2px] w-[20px] bg-black rounded-lg" />
    </button>
  );
};
