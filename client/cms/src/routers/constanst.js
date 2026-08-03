export const local = "http://localhost:3000/";
// export const publicSite = "https://royale-lite.neir-0.online/";
export const publicSite = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:3000/"
  : "https://royale-api.relia.fun/";

/*
local: http://localhost:3000/
public: https://royale-lite.neir-0.online/

// midtrans:
- https://royale-lite.neir-0.online/payment/midtrans/notifications
*/
