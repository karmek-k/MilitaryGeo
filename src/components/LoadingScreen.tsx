type Props = {
  label: string;
};

export default function LoadingScreen({ label }: Props) {
  return <div className="loading">Ładowanie: {label}</div>;
}
