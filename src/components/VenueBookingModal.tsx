import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiX, FiXCircle } from "react-icons/fi";

const setTime = (date: any, time: any) => {
  const [hours, minutes] = time.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);
};

const generateTimeSlots : any = ( startTime: any, endTime: any, intervalMinutes: any ) => {
  const slots = [];
  const start = new Date();
  const end = new Date();

  setTime(start, startTime);
  setTime(end, endTime);

  while (start < end) {
    const slotStart = start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    start.setTime(start.getTime() + intervalMinutes * 60000);
    const slotEnd = start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    slots.push(`${slotStart} - ${slotEnd}`);
  }

  return slots;
};

const VenueBookingModal = ({ openBookingModal, setOpenBookingModal, venueDetails} : any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateInfo, setSelectedDateInfo] : any = useState(null);

  //   first slot click
  const [firstSlot, setFirstSlot] : any = useState(null);

  // last slot click
  const [lastSlot, setLastSlot] : any = useState(null);

  const [allSelectedSlots, setAllSelectedSlots] : any = useState([]);

  const [isDisabledSlotsPresent, setIsDisabledSlotsPresent] = useState(false);

  const [firstDis, setFirstDis] = useState(null);

  const timeSlotIntervalMinutes = 60; // 1 hour time slots

  const allTimeSlots = generateTimeSlots(
    venueDetails.timing.startTime,
    venueDetails.timing.endTime,
    timeSlotIntervalMinutes
  );

  const bookedTimeSlots = [
    {
      date: "2024-04-22",
      slots: [
        { start: "12:00", end: "13:00" },
        { start: "13:00", end: "14:00" },
        { start: "16:00", end: "17:00" },
      ],
    },
    {
      date: "2024-04-21",
      slots: [{ start: "12:00", end: "14:00" }],
    },
    {
      date: "2024-04-12",
      slots: [{ start: "12:00", end: "14:00" }],
    },
  ];

  //   this has to be with the time, on a particular selected date,it should check the time slots
  const isSlotBooked : any = (slot : any) => {
    const bookedSlotsOnSelectedDate = selectedDateInfo?.slots?.find(
      (bookedSlot : any) => bookedSlot.start <= slot && bookedSlot.end >= slot
    );

    return bookedSlotsOnSelectedDate;
  };

  const handleDateSelect = (date : any) => {
    setSelectedDate(date);
    const availableTimeSlots = bookedTimeSlots.find((slot) => {
      const bookedDate = new Date(slot.date);
      const selectedDate = new Date(date);

      return (
        bookedDate.getDate() === selectedDate.getDate() &&
        bookedDate.getMonth() === selectedDate.getMonth() &&
        bookedDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    setFirstSlot(null);
    setLastSlot(null);

    setAllSelectedSlots([]);

    setSelectedDateInfo(availableTimeSlots);
  };

  const handleSlotSelect = (slot : any) => {
    if (!firstSlot) {
      setFirstSlot(slot);
      setAllSelectedSlots(
        generateTimeSlots(slot.split("-")[0], slot.split("-")[1], 60)
      );
    } else if (!lastSlot) {
      setLastSlot(slot);
      setAllSelectedSlots(
        generateTimeSlots(firstSlot.split("-")[0], slot.split("-")[1], 60)
      );
    }
  };

  const convertTimeSlot : any = (slot : any) => {
    const [startTime, endTime] = slot.split(" - ");
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Subtract an hour from the start time
    let newStartHour = startHour - 1;
    let newEndHour = endHour - 1;

    // Handle cases where the hour becomes negative
    if (newStartHour < 0) {
      newStartHour = 23; // Wrap around to 23:00
    }
    if (newEndHour < 0) {
      newEndHour = 23; // Wrap around to 23:00
    }

    // Format the new time slot
    const newStartTime = `${String(newStartHour).padStart(2, "0")}:${String(
      startMinute
    ).padStart(2, "0")}`;
    const newEndTime = `${String(newEndHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;

    return `${newStartTime} - ${newEndTime}`;
  };

  useEffect(() => {
    setIsDisabledSlotsPresent(
      allSelectedSlots.some((slot : any) => isSlotBooked(slot))
    );
    const allDisSlots = allSelectedSlots.filter((slot : any) => isSlotBooked(slot));
    setFirstDis(allDisSlots[0]);
    console.log("firstDis", firstDis);
    if (isDisabledSlotsPresent) {
      setLastSlot(convertTimeSlot(firstDis));
      setAllSelectedSlots(
        generateTimeSlots(firstSlot?.split("-")[0], lastSlot?.split("-")[1], 60)
      );
    }
  }, [firstSlot, lastSlot, allSelectedSlots, isDisabledSlotsPresent]);

  console.log("allSelectedSlots", allSelectedSlots);

  console.log("isDisabledSlotsPresent", isDisabledSlotsPresent);

  const toMakeSlotSelected = (slot : any) => {
    return allSelectedSlots?.includes(slot);
  };

  return (
    <div>
      {openBookingModal && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">
                Book a Slot @ {venueDetails.name}
              </h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenBookingModal(false)}
              />
            </div>

            <div>
              <div className="px-6 flex flex-col justify-center items-center gap-10 pb-6">
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={(date) => handleDateSelect(date)}
                  minDate={new Date()} // Disable past dates
                  className="p-2 border rounded-md focus:outline-none"
                />
                {firstSlot && lastSlot && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-medium text-center">
                      Selected Time Slot:
                    </h3>
                    <p className="text-center">
                      {firstSlot} - {lastSlot}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium text-center">
                    Available Time Slots:
                  </h3>
                  <ul className="flex items-center justify-center gap-6 flex-wrap">
                    {allTimeSlots.map((slot : any) => (
                      <li key={slot} className="relative">
                        <button
                          className={`p-2 border rounded-md focus:outline-none ${
                            toMakeSlotSelected(slot)
                              ? "bg-green-500 text-white"
                              : ""
                          } ${
                            isSlotBooked(slot)
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                              : "bg-blue-500 text-white"
                          } ${
                            firstSlot === slot || lastSlot === slot
                              ? "cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={
                            isSlotBooked(slot) ||
                            firstSlot === slot ||
                            lastSlot === slot
                          }
                        >
                          {slot}
                        </button>
                        {firstSlot && firstSlot === slot && (
                          <FiXCircle
                            className="absolute -top-1 bg-white rounded-full -right-1 cursor-pointer h-4 w-4 text-red-600"
                            onClick={() => {
                              setFirstSlot(null);
                              setLastSlot(null);
                              setAllSelectedSlots([]);
                            }}
                          />
                        )}
                        {lastSlot && lastSlot === slot && (
                          <FiXCircle
                            className="absolute -top-1 bg-white rounded-full -right-1 cursor-pointer h-4 w-4 text-red-600"
                            onClick={() => {
                              setLastSlot(null);
                              setAllSelectedSlots(
                                generateTimeSlots(
                                  firstSlot.split("-")[0],
                                  firstSlot.split("-")[1],
                                  60
                                )
                              );
                            }}
                          />
                        )}

                        {firstSlot && firstSlot === slot && (
                          <span className="absolute text-xs font-semibold -top-3 left-0 bg-white px-1 rounded-full">
                            from
                          </span>
                        )}
                        {lastSlot && lastSlot === slot && (
                          <span className="absolute text-xs font-semibold -top-3 left-0 bg-white px-1 rounded-full">
                            to
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueBookingModal;
