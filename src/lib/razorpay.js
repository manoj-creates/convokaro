export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const handleProUpgrade = async (user) => {
  const res = await loadRazorpay();

  if (!res) {
    alert("Razorpay SDK failed to load. Please check your connection.");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: "4900", // ₹49 in paise
    currency: "INR",
    name: "ConvoKaro Pro",
    description: "Unlock all premium features",
    image: "https://ui-avatars.com/api/?name=ConvoKaro&background=16a34a&color=fff",
    handler: function (response) {
      alert("Payment Successful! Welcome to ConvoKaro Pro.");
      // In a real app, you would connect this to the Supabase database here.
      console.log("Razorpay Response:", response);
    },
    prefill: {
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
    },
    theme: {
      color: "#16a34a",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
