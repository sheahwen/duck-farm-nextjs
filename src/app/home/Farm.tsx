import Image from 'next/image';

// Define the positions for 10 points as percentages of the container
const POINT_POSITIONS = [
  { x: '10%', y: '47%' },
  { x: '15%', y: '63%' },
  { x: '25%', y: '43%' },
  { x: '30%', y: '68%' },
  { x: '40%', y: '55%' },
  { x: '48%', y: '85%' },
  { x: '60%', y: '65%' },
  { x: '63%', y: '90%' },
  { x: '80%', y: '50%' },
  { x: '88%', y: '72%' },
];

const Farm = () => {
  return (
    <div className="relative aspect-video bg-red-500">
      {/* Main farm image */}
      <Image
        src="/duck-farm.png"
        alt="Duck Farm"
        fill
        className="object-cover"
      />

      {/* Overlay points */}
      {POINT_POSITIONS.map((position, index) => (
        <div
          key={index}
          className="absolute -translate-x-1/2 -translate-y-1/2 transform"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <Image
            src="/duck-sleeping.webp"
            alt={`Point ${index + 1}`}
            width={100}
            height={100}
            className="h-[6vw] min-h-[20px] w-[6vw] min-w-[20px]"
          />
        </div>
      ))}
    </div>
  );
};

export default Farm;
