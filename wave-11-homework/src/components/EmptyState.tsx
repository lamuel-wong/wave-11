export const EmptyState = ({
  message,
  icon = "🛍️",
  description = "Nothing matches this section. Check back soon!",
}: {
  message: string;
  icon?: string;
  description?: string;
}) => {
  return (
    <div className="mt-4 rounded-xl border-2 border-dashed border-gray-300 bg-white px-6 py-12 text-center dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 text-4xl">{icon}</div>
      <h2 className="mt-1 text-xl font-bold"> {message}</h2>
      <p className="text-center text-sm italic text-gray-400">{description}</p>
    </div>
  );
};
