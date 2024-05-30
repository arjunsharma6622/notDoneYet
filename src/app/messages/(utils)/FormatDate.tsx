import { format, isToday, isYesterday } from "date-fns";

export const formatDate = (date: any) => {
  const messageDate = new Date(date);

  if (isToday(messageDate)) {
    return format(messageDate, "hh:mm a");
  } else if (isYesterday(messageDate)) {
    return "Yesterday";
  } else {
    return format(messageDate, "MMMM dd, yyyy");
  }
};

export const formatConversationDate = (date: any) => {
  const messageDate = new Date(date);

  if (isToday(messageDate)) {
    return `Today`;
  } else if (isYesterday(messageDate)) {
    return `Yesterday`;
  } else {
    return format(messageDate, "MMMM dd, yyyy");
  }
};

export const formatMessageTime = (date: any) => {
  const messageDate = new Date(date);
  return format(messageDate, "hh:mm a");
};
