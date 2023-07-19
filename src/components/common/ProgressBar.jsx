export const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 rounded-full min-w-[200px] bg-gray-300">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="h-full rounded-full bg-primary-600"
        ></div>
      </div>
      <div>{progressPercentage}%</div>
    </div>
  );
};
