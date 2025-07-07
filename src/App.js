import { useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';

const Animal = ({ name, startX, startY, outline, onScore }) => {
  const [pos, setPos] = useState({ x: startX, y: startY });
  const [isDraggable, setIsDraggable] = useState(true);
  const [inRightPlace, setInRightPlace] = useState(false);
  
  const [image] = useImage(`https://konvajs.org/assets/${name}.png`);
  const [glowImage] = useImage(`https://konvajs.org/assets/${name}-glow.png`);

  const isNearOutline = (pos, outline) => {
    const { x, y } = pos;
    return (
      x > outline.x - 20 &&
      x < outline.x + 20 &&
      y > outline.y - 20 &&
      y < outline.y + 20
    );
  };

  if (!image || !glowImage) return null;

  return (
    <Image
      image={image}
      x={pos.x}
      y={pos.y}
      draggable={isDraggable}
      onDragStart={(e) => e.target.moveToTop()}
      onDragEnd={(e) => {
        const newPos = { x: e.target.x(), y: e.target.y() };
        setPos(newPos);
        
        if (!inRightPlace && isNearOutline(newPos, outline)) {
          setPos({ x: outline.x, y: outline.y });
          setInRightPlace(true);
          setIsDraggable(false);
          onScore();
        }
      }}
      onMouseOver={(e) => {
        e.target.image(glowImage);
        const stage = e.target.getStage();
        stage.container().style.cursor = 'pointer';
      }}
      onMouseOut={(e) => {
        e.target.image(image);
        const stage = e.target.getStage();
        stage.container().style.cursor = 'default';
      }}
      onDragMove={(e) => {
        const stage = e.target.getStage();
        stage.container().style.cursor = 'pointer';
      }}
    />
  );
};

const AnimalOutline = ({ name, x, y }) => {
  const [image] = useImage(`https://konvajs.org/assets/${name}-black.png`);
  return image ? <Image image={image} x={x} y={y} /> : null;
};

const Background = () => {
  const [image] = useImage('https://konvajs.org/assets/beach.png');
  return image ? <Image image={image} width={578} height={530} /> : null;
};

const App = () => {
  const [score, setScore] = useState(0);
  
  const animals = {
    snake: { x: 10, y: 70, outline: { x: 275, y: 350 } },
    giraffe: { x: 90, y: 70, outline: { x: 390, y: 250 } },
    monkey: { x: 275, y: 70, outline: { x: 300, y: 420 } },
    lion: { x: 400, y: 70, outline: { x: 100, y: 390 } }
  };

  return (
    <Stage width={578} height={530}>
      <Layer>
        <Background />
        <Text
          text={score >= 4 ? 'You win! Enjoy your booty!' : 'Ahoy! Put the animals on the beach!'}
          x={578 / 2}
          y={40}
          fontSize={20}
          fontFamily="Calibri"
          fill="white"
          align="center"
          offsetX={200}
        />
      </Layer>
      <Layer>
        {Object.entries(animals).map(([name, pos]) => (
          <AnimalOutline
            key={`${name}_outline`}
            name={name}
            x={pos.outline.x}
            y={pos.outline.y}
          />
        ))}
        {Object.entries(animals).map(([name, pos]) => (
          <Animal
            key={name}
            name={name}
            startX={pos.x}
            startY={pos.y}
            outline={pos.outline}
            onScore={() => setScore(s => s + 1)}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default App;
