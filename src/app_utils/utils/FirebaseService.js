import { db, auth } from "./firebase-config";

// Auth service for handling login, registration, and authentication
class AuthService {
  // Login with email and password
  static login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Login Error: ", error);
      throw error;
    }
  };

  // Register a new user
  static register = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Registration Error: ", error);
      throw error;
    }
  };

  // Logout
  static logout = () => {
    auth.signOut();
  };

  // Get currently logged-in user
  static getCurrentUser = () => {
    return auth.currentUser;
  };
}

// Church Members service
class ChurchMembersService {
  static addMember = async (memberData) => {
    try {
      const docRef = await db.collection("members").add(memberData);
      return docRef.id;
    } catch (error) {
      console.error("Error adding member: ", error);
      throw error;
    }
  };

  static getMember = async (id) => {
    try {
      const doc = await db.collection("members").doc(id).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error("Error fetching member: ", error);
      throw error;
    }
  };

  static getAllMembers = async () => {
    try {
      const snapshot = await db.collection("members").get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching members: ", error);
      throw error;
    }
  };
}

// Pledge service
class PledgeService {
  static createPledge = async (pledgeData) => {
    try {
      const docRef = await db.collection("pledges").add(pledgeData);
      return docRef.id;
    } catch (error) {
      console.error("Error creating pledge: ", error);
      throw error;
    }
  };

  static getPledge = async (id) => {
    try {
      const doc = await db.collection("pledges").doc(id).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error("Error fetching pledge: ", error);
      throw error;
    }
  };

  static getAllPledges = async () => {
    try {
      const snapshot = await db.collection("pledges").get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching pledges: ", error);
      throw error;
    }
  };
}

// Pledge Payment service
class PledgePaymentService {
  static addPayment = async (paymentData) => {
    try {
      const docRef = await db.collection("pledgePayments").add(paymentData);
      return docRef.id;
    } catch (error) {
      console.error("Error adding payment: ", error);
      throw error;
    }
  };

  static getPaymentsForPledge = async (pledgeId) => {
    try {
      const snapshot = await db
        .collection("pledgePayments")
        .where("pledgeId", "==", pledgeId)
        .get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error("Error fetching payments: ", error);
      throw error;
    }
  };
}

export { AuthService, ChurchMembersService, PledgeService, PledgePaymentService };
