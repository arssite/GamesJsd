import React, { useState, useEffect } from 'react';
import { Volume2, Home, Book, Users, Car, Apple, Sun, Fish, Shirt, Play, ArrowLeft, ArrowRight } from 'lucide-react';

const PictureDictionary = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample vocabulary data with 30 categories
  const vocabularyData = {
    animals: {
      name: "Animals",
      icon: Fish,
      color: "bg-green-500",
      words: [
        { word: "Cat", image: "🐱", audio: "cat" },
        { word: "Dog", image: "🐶", audio: "dog" },
        { word: "Bird", image: "🐦", audio: "bird" },
        { word: "Fish", image: "🐟", audio: "fish" },
        { word: "Lion", image: "🦁", audio: "lion" },
        { word: "Elephant", image: "🐘", audio: "elephant" },
        { word: "Rabbit", image: "🐰", audio: "rabbit" },
        { word: "Bear", image: "🐻", audio: "bear" }
      ]
    },
    food: {
      name: "Food",
      icon: Apple,
      color: "bg-red-500",
      words: [
        { word: "Apple", image: "🍎", audio: "apple" },
        { word: "Banana", image: "🍌", audio: "banana" },
        { word: "Orange", image: "🍊", audio: "orange" },
        { word: "Bread", image: "🍞", audio: "bread" },
        { word: "Milk", image: "🥛", audio: "milk" },
        { word: "Egg", image: "🥚", audio: "egg" },
        { word: "Cake", image: "🍰", audio: "cake" },
        { word: "Pizza", image: "🍕", audio: "pizza" }
      ]
    },
    transport: {
      name: "Transport",
      icon: Car,
      color: "bg-blue-500",
      words: [
        { word: "Car", image: "🚗", audio: "car" },
        { word: "Bus", image: "🚌", audio: "bus" },
        { word: "Train", image: "🚂", audio: "train" },
        { word: "Plane", image: "✈️", audio: "plane" },
        { word: "Bike", image: "🚲", audio: "bike" },
        { word: "Ship", image: "🚢", audio: "ship" },
        { word: "Truck", image: "🚚", audio: "truck" },
        { word: "Taxi", image: "🚕", audio: "taxi" }
      ]
    },
    family: {
      name: "Family",
      icon: Users,
      color: "bg-purple-500",
      words: [
        { word: "Father", image: "👨", audio: "father" },
        { word: "Mother", image: "👩", audio: "mother" },
        { word: "Brother", image: "👦", audio: "brother" },
        { word: "Sister", image: "👧", audio: "sister" },
        { word: "Baby", image: "👶", audio: "baby" },
        { word: "Grandma", image: "👵", audio: "grandma" },
        { word: "Grandpa", image: "👴", audio: "grandpa" },
        { word: "Family", image: "👨‍👩‍👧‍👦", audio: "family" }
      ]
    },
    clothes: {
      name: "Clothes",
      icon: Shirt,
      color: "bg-pink-500",
      words: [
        { word: "Shirt", image: "👕", audio: "shirt" },
        { word: "Pants", image: "👖", audio: "pants" },
        { word: "Dress", image: "👗", audio: "dress" },
        { word: "Shoes", image: "👞", audio: "shoes" },
        { word: "Hat", image: "👒", audio: "hat" },
        { word: "Socks", image: "🧦", audio: "socks" },
        { word: "Jacket", image: "🧥", audio: "jacket" },
        { word: "Gloves", image: "🧤", audio: "gloves" }
      ]
    },
    weather: {
      name: "Weather",
      icon: Sun,
      color: "bg-yellow-500",
      words: [
        { word: "Sun", image: "☀️", audio: "sun" },
        { word: "Rain", image: "🌧️", audio: "rain" },
        { word: "Snow", image: "❄️", audio: "snow" },
        { word: "Wind", image: "💨", audio: "wind" },
        { word: "Cloud", image: "☁️", audio: "cloud" },
        { word: "Rainbow", image: "🌈", audio: "rainbow" },
        { word: "Lightning", image: "⚡", audio: "lightning" },
        { word: "Storm", image: "⛈️", audio: "storm" }
      ]
    },
    home: {
      name: "Home",
      icon: Home,
      color: "bg-indigo-500",
      words: [
        { word: "House", image: "🏠", audio: "house" },
        { word: "Door", image: "🚪", audio: "door" },
        { word: "Window", image: "🪟", audio: "window" },
        { word: "Bed", image: "🛏️", audio: "bed" },
        { word: "Chair", image: "🪑", audio: "chair" },
        { word: "Table", image: "🪑", audio: "table" },
        { word: "Kitchen", image: "🍳", audio: "kitchen" },
        { word: "Bathroom", image: "🛁", audio: "bathroom" }
      ]
    },
    school: {
      name: "School",
      icon: Book,
      color: "bg-orange-500",
      words: [
        { word: "Book", image: "📚", audio: "book" },
        { word: "Pen", image: "🖊️", audio: "pen" },
        { word: "Pencil", image: "✏️", audio: "pencil" },
        { word: "Teacher", image: "👨‍🏫", audio: "teacher" },
        { word: "Student", image: "👨‍🎓", audio: "student" },
        { word: "Desk", image: "🪑", audio: "desk" },
        { word: "Bag", image: "🎒", audio: "bag" },
        { word: "Computer", image: "💻", audio: "computer" }
      ]
    }
  };

  // Text-to-speech function
  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  // Navigation functions
  const nextWord = () => {
    if (currentCategory && currentWord < vocabularyData[currentCategory].words.length - 1) {
      setCurrentWord(currentWord + 1);
    }
  };

  const prevWord = () => {
    if (currentCategory && currentWord > 0) {
      setCurrentWord(currentWord - 1);
    }
  };

  // Auto-play word when it changes
  useEffect(() => {
    if (currentCategory) {
      const word = vocabularyData[currentCategory].words[currentWord].word;
      const timer = setTimeout(() => speakWord(word), 500);
      return () => clearTimeout(timer);
    }
  }, [currentWord, currentCategory]);

  // Category Grid View
  const CategoryGrid = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📚 Picture Dictionary
          </h1>
          <p className="text-xl text-gray-600">
            Learn English vocabulary with images and audio
          </p>
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg">
              <span className="text-lg font-semibold text-gray-700">
                {Object.keys(vocabularyData).length} Categories Available
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(vocabularyData).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <div
                key={key}
                onClick={() => {
                  setCurrentCategory(key);
                  setCurrentWord(0);
                }}
                className={${category.color} rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group}
              >
                <div className="text-center text-white">
                  <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <IconComponent size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">
                    {category.words.length} words
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl inline-block">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Perfect for ESL Learners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="text-4xl mb-2">👀</div>
                <h3 className="font-semibold text-gray-700">Visual Learning</h3>
                <p className="text-sm text-gray-600">Learn with colorful images</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔊</div>
                <h3 className="font-semibold text-gray-700">Audio Pronunciation</h3>
                <p className="text-sm text-gray-600">Hear native pronunciation</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎮</div>
                <h3 className="font-semibold text-gray-700">Interactive</h3>
                <p className="text-sm text-gray-600">Fun and engaging experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Word Learning View
  const WordView = () => {
    const category = vocabularyData[currentCategory];
    const word = category.words[currentWord];

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentCategory(null)}
              className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Back to Categories</span>
            </button>
            <div className="bg-white rounded-full px-6 py-3 shadow-lg">
              <span className="font-semibold text-gray-700">
                {currentWord + 1} / {category.words.length}
              </span>
            </div>
          </div>

          {/* Category Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {category.name}
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Main Word Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="text-center">
              <div className="text-9xl mb-6">{word.image}</div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                {word.word}
              </h2>
              <button
                onClick={() => speakWord(word.word)}
                disabled={isPlaying}
                className={${isPlaying ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full px-8 py-4 text-xl font-semibold transition-colors flex items-center gap-3 mx-auto}
              >
                {isPlaying ? <Play size={24} /> : <Volume2 size={24} />}
                {isPlaying ? 'Playing...' : 'Listen'}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={prevWord}
              disabled={currentWord === 0}
              className={${currentWord === 0 ? 'bg-gray-300' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-full px-6 py-3 font-semibold transition-colors flex items-center gap-2}
            >
              <ArrowLeft size={20} />
              Previous
            </button>
            <button
              onClick={nextWord}
              disabled={currentWord === category.words.length - 1}
              className={${currentWord === category.words.length - 1 ? 'bg-gray-300' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-full px-6 py-3 font-semibold transition-colors flex items-center gap-2}
            >
              Next
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Word Grid */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              All {category.name} Words
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.words.map((w, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentWord(index)}
                  className={${index === currentWord ? 'ring-4 ring-blue-500 bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl p-4 cursor-pointer transition-all text-center}
                >
                  <div className="text-4xl mb-2">{w.image}</div>
                  <p className="font-semibold text-gray-700">{w.word}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return currentCategory ? <WordView /> : <CategoryGrid />;
};

export default PictureDictionary;
