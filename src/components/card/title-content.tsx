import { Text } from "@mantine/core";

interface TitleContentProps {
  title: string;
  subject?: string;
  titleSize: "3xl" | "xl";
}

const TitleContent = ({ title, subject, titleSize }: TitleContentProps) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <h1 className={`font-bold text-${titleSize} line-clamp-2`}>{title}</h1>
      <Text size="lg">{subject}</Text>
    </div>
  );
};

export default TitleContent;
