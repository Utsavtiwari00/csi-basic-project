import React, { useEffect, useState } from 'react';
import { Search, BookOpen, Trophy, Users, Star, ChevronRight, Play, Clock, Target } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Profile from './profile'; 
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Landingpage = () => {
  const navigate = useNavigate();

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  const toquiz = () => {
    navigate('/quiz');
  };

  const handleShowProfile = () => {
    setIsProfileVisible(true);
  };

  const handleCloseProfile = () => {
    setIsProfileVisible(false);
  };

  const subjects = [
    { name: "Physics", icon: "⚛️", color: "bg-blue-500", questions: "2,500+" },
    { name: "Chemistry", icon: "🧪", color: "bg-green-500", questions: "2,200+" },
    { name: "Mathematics", icon: "📐", color: "bg-purple-500", questions: "2,800+" },
    { name: "Biology", icon: "🧬", color: "bg-red-500", questions: "3,000+" },
    { name: "Botany", icon: "🌱", color: "bg-emerald-500", questions: "1,500+" },
    { name: "Zoology", icon: "🦋", color: "bg-orange-500", questions: "1,500+" },
  ];

  const years = [
    { year: "2024", jee: 180, neet: 200, featured: true },
    { year: "2023", jee: 180, neet: 200, featured: true },
    { year: "2022", jee: 180, neet: 200, featured: false },
    { year: "2021", jee: 180, neet: 200, featured: false },
    { year: "2020", jee: 180, neet: 200, featured: false },
    { year: "2019", jee: 180, neet: 200, featured: false },
  ];

  const featuredSets = [
    {
      title: "JEE Main 2024 Complete",
      description: "All shifts with detailed solutions",
      questions: 540,
      color: "from-blue-500 to-purple-600",
      icon: "🎯",
      difficulty: "Mixed",
    },
    {
      title: "NEET 2024 Biology Focus",
      description: "High-yield biology questions",
      questions: 200,
      color: "from-green-500 to-teal-600",
      icon: "🧬",
      difficulty: "Hard",
    },
    {
      title: "Physics Mechanics PYQs",
      description: "5-year compilation",
      questions: 450,
      color: "from-orange-500 to-red-600",
      icon: "⚛️",
      difficulty: "Medium",
    },
  ];

  return (
    <>

      <div
        className={`min-h-screen bg-gray-900 text-white transition-filter duration-300 ${
          isProfileVisible ? 'filter blur-sm' : ''
        }`}
      >
        <Header onShowProfile={handleShowProfile} currentUser={user} />
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Master JEE & NEET with
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> PYQs</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Practice with authentic previous year questions organized by year and subject. Get detailed solutions and
                track your progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={toquiz} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all">
                  <Play className="w-5 h-5" />
                  <span>Start Practicing</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">15,000+</div>
                <div className="text-gray-400">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">10</div>
                <div className="text-gray-400">Years Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50,000+</div>
                <div className="text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Question Sets</h2>
              <button className="text-blue-400 hover:text-blue-300 flex items-center space-x-1">
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredSets.map((set, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${set.color} rounded-xl flex items-center justify-center text-2xl mb-4`}
                  >
                    {set.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{set.title}</h3>
                  <p className="text-gray-400 mb-4">{set.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{set.questions} questions</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        set.difficulty === "Hard"
                          ? "bg-red-900 text-red-300"
                          : set.difficulty === "Medium"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {set.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Practice by Subject</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-750 transition-colors cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 ${subject.color} rounded-xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}
                  >
                    {subject.icon}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">{subject.name}</h3>
                  <p className="text-sm text-gray-400">{subject.questions}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Year-wise Question Papers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {years.map((yearData, index) => (
                <div
                  key={index}
                  className={`bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer ${yearData.featured ? "ring-2 ring-blue-500" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{yearData.year}</h3>
                    {yearData.featured && <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">Latest</span>}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4" />
                        </div>
                        <span className="font-medium">JEE Main</span>
                      </div>
                      <span className="text-gray-300">{yearData.jee} questions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="font-medium">NEET</span>
                      </div>
                      <span className="text-gray-300">{yearData.neet} questions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Examprep?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Timed Practice</h3>
                <p className="text-gray-400">Simulate real exam conditions with time limits</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Detailed Solutions</h3>
                <p className="text-gray-400">Step-by-step explanations for every question</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-400">Monitor your improvement over time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-400">Connect with fellow aspirants</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Examprep</span>
                </div>
                <p className="text-gray-400">Your ultimate companion for JEE and NEET preparation.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Exams</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      JEE Main
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      JEE Advanced
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      NEET
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      BITSAT
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Question Bank
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Mock Tests
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Study Material
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Analytics
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Examprep. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div> 

      
      <Profile
        isVisible={isProfileVisible}
        onClose={handleCloseProfile}
        accuracy={85} 
        UserName={user ? user.email.split("@")[0] : "Guest"} 
        quesNo={120} 
      />
    </>
  );
};

export default Landingpage;