interface CardProps {
  name: string;
  title: string;
}

export const Card: React.FC<CardProps> = ({ name, title }) => {
  return (
    <div className="border border-solid border-zinc-400 p-2 rounded flex flex-col items-center gap-2">
      <h3 className="text-2xl">{name}</h3>
      <p className="italic">{title}</p>
    </div>
  );
};
