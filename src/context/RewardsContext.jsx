import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const RewardsContext = createContext({
  rewards: {
    points: 0,
    tier: "Bronce",
    history: [],
  },
  addPoints: () => {},
});

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error("useRewards debe ser usado dentro de un RewardsProvider");
  }
  return context;
};

export const RewardsProvider = ({ children }) => {
  const { user } = useAuth();
  const [rewards, setRewards] = useState({
    points: 0,
    tier: "Bronce",
    history: [],
  });

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists() && doc.data().rewards) {
          setRewards(doc.data().rewards);
        }
      });
    }
  }, [user]);

  const addPoints = async (points, reason) => {
    if (!user) return;

    const newPoints = rewards.points + points;
    const newTier = calculateTier(newPoints);

    const newRewards = {
      points: newPoints,
      tier: newTier,
      history: [
        ...rewards.history,
        {
          date: new Date(),
          points,
          reason,
          type: "earn",
        },
      ],
    };

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { rewards: newRewards });
    setRewards(newRewards);
  };

  const calculateTier = (points) => {
    if (points >= 1000) return "Diamante";
    if (points >= 500) return "Oro";
    if (points >= 200) return "Plata";
    return "Bronce";
  };

  return (
    <RewardsContext.Provider value={{ rewards, addPoints }}>
      {children}
    </RewardsContext.Provider>
  );
};
