
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "High-quality noise-cancelling wireless headphones with 30hr battery life.",
    price: 59.99,
  },
  {
    id: 2,
    title: "Mechanical Keyboard",
    description: "Compact RGB mechanical keyboard with tactile switches, perfect for coding.",
    price: 89.99,
  },
  {
    id: 3,
    title: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card, and PD charging support.",
    price: 34.99,
  },
  {
    id: 4,
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics and airflow.",
    price: 24.99,
  },
];