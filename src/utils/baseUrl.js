export const baseUrl = "https://emp-server-7y1g.onrender.com/api";

export const designationData = ["hr", "manager", "sales"];

export const courseData = ["mca", "bca", "bsc"];

export const getFormattedDateAndTime = (value) => {
  const dateObject = new Date(value);

  const formattedDate = dateObject.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formattedDate
};
