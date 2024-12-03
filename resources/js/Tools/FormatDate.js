export default function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
  
    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
  
    for (const unit of units) {
      const amount = Math.floor(diffInSeconds / unit.seconds);
      if (amount > 0) {
        return `${amount} ${unit.label}${amount > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }