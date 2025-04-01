import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    const isAdmin =
      userData.email === "admin@techstore.com" &&
      userData.password === "admin123";

    const userWithPrivileges = {
      ...userData,
      role: isAdmin ? "admin" : "user",
      privileges: {
        discounts: true,
        specialOffers: true,
        prioritySupport: true,
        membershipLevel: isAdmin ? "admin" : "standard",
        discountPercentage: isAdmin ? 25 : 10,
        rewardPoints: 0,
        specialAccess: isAdmin
          ? [
              "admin_panel",
              "ofertas_exclusivas",
              "preventas",
              "gestión_usuarios",
              "estadísticas",
            ]
          : ["ofertas_exclusivas", "preventas"],
        canManageProducts: isAdmin,
        canManageUsers: isAdmin,
        canViewStats: isAdmin,
      },
      lastLogin: new Date().toISOString(),
      emailVerified: isAdmin ? true : false,
      rewards: {
        points: isAdmin ? 1000 : 0,
        history: [],
        tier: isAdmin ? "platinum" : "bronze",
        nextTierProgress: isAdmin ? 100 : 0,
        availableRewards: [],
      },
    };
    setUser(userWithPrivileges);
    localStorage.setItem("user", JSON.stringify(userWithPrivileges));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserPrivileges = (newPrivileges) => {
    if (user) {
      const updatedUser = {
        ...user,
        privileges: {
          ...user.privileges,
          ...newPrivileges,
        },
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const sendVerificationEmail = async (email) => {
    try {
      const verificationCode = Math.random().toString(36).substring(2, 8);
      localStorage.setItem(`verificationCode_${email}`, verificationCode);
      console.log(`Código de verificación para ${email}: ${verificationCode}`);
      return true;
    } catch (error) {
      console.error("Error al enviar email de verificación:", error);
      return false;
    }
  };

  const verifyEmail = async (email, code) => {
    const savedCode = localStorage.getItem(`verificationCode_${email}`);
    if (savedCode === code) {
      const updatedUser = {
        ...user,
        emailVerified: true,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.removeItem(`verificationCode_${email}`);
      return true;
    }
    return false;
  };

  const calculateTier = (points) => {
    if (points >= 1000) return "platinum";
    if (points >= 500) return "gold";
    if (points >= 200) return "silver";
    return "bronze";
  };

  const calculateNextTierProgress = (points) => {
    if (points < 200) return (points / 200) * 100;
    if (points < 500) return ((points - 200) / 300) * 100;
    if (points < 1000) return ((points - 500) / 500) * 100;
    return 100;
  };

  const getAvailableRewards = (tier) => {
    const rewards = {
      bronze: ["5% descuento próxima compra"],
      silver: ["10% descuento próxima compra", "Envío gratis"],
      gold: [
        "15% descuento próxima compra",
        "Envío gratis",
        "Soporte prioritario",
      ],
      platinum: [
        "20% descuento próxima compra",
        "Envío gratis",
        "Soporte VIP",
        "Acceso anticipado a ofertas",
      ],
    };
    return rewards[tier] || [];
  };

  const addRewardPoints = (points, reason) => {
    if (user) {
      const updatedUser = {
        ...user,
        rewards: {
          ...user.rewards,
          points: (user.rewards.points || 0) + points,
          history: [
            ...user.rewards.history,
            {
              points,
              reason,
              date: new Date().toISOString(),
            },
          ],
        },
      };

      updatedUser.rewards.tier = calculateTier(updatedUser.rewards.points);
      updatedUser.rewards.nextTierProgress = calculateNextTierProgress(
        updatedUser.rewards.points
      );
      updatedUser.rewards.availableRewards = getAvailableRewards(
        updatedUser.rewards.tier
      );

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserPrivileges,
        addRewardPoints,
        verifyEmail,
        sendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export default AuthProvider;
