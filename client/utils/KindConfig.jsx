/*
 Kinde is a platform offering authentication and authorization solutions for developers to integrate into their applications.
*/

import { KindeSDK } from "@kinde-oss/react-native-sdk-0-7x";

export const client = new KindeSDK(
  "https://pojectbudgetplanner.kinde.com", //Domain
  "exp://192.168.231.127:8081", //URL
  "b48e6ee88e504119b38c398c5136b767", //Client ID
  "exp://192.168.231.127:8081" //URL
);
