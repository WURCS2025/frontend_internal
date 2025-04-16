import { useEffect, useState } from "react";
import { USER_LIST_URL } from "../../constants" // Adjust the import path as necessary

// services/userService.ts

export interface User {
  id: string;
  username: string;
}

export const fetchUsers = async (username: string): Promise<User[]> => {
  const response = await fetch(`${USER_LIST_URL}/userlist?username=${username}`);

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.statusText}`);
  }

  return await response.json(); // ✅ Must return the parsed data
};


  