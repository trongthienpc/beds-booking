document.addEventListener("DOMContentLoaded", () => {
  const currentMonthElement = document.getElementById("current-month");
  const dataContainer = document.getElementById("data");
  const daysHeader = document.getElementById("days-header");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = 2; // March (0-based index)
  let currentYear = 2020;

  function updateCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous day headers
    while (daysHeader.children.length > 3) {
      daysHeader.removeChild(daysHeader.lastChild);
    }

    // Set up day headers
    for (let i = 1; i <= daysInMonth; i++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("header-cell");
      dayCell.textContent = i;
      daysHeader.appendChild(dayCell);
    }

    // Clear previous data rows
    dataContainer.innerHTML = "";

    // Populate data rows
    bedData.forEach((bed) => {
      const row = document.createElement("div");
      row.classList.add("data-row");

      const numberCell = document.createElement("div");
      numberCell.classList.add("data-cell");
      numberCell.textContent = bed.number;
      row.appendChild(numberCell);

      const typeCell = document.createElement("div");
      typeCell.classList.add("data-cell");
      typeCell.textContent = bed.type;
      row.appendChild(typeCell);

      const statusCell = document.createElement("div");
      statusCell.classList.add("data-cell");
      statusCell.textContent = bed.status;
      row.appendChild(statusCell);

      for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("data-cell");
        const booking = bed.bookings.find((b) => i >= b.start && i <= b.end);
        if (booking) {
          dayCell.textContent = booking.id;
          dayCell.classList.add("booking");
          dayCell.classList.add(booking.status.toLowerCase().replace(" ", "-"));
        }
        row.appendChild(dayCell);
      }

      dataContainer.appendChild(row);
    });
  }

  // Sample data - replace with actual data as needed
  const bedData = [
    {
      number: "101",
      type: "1 bed",
      status: "Ready",
      bookings: [{ id: "A-12", start: 2, end: 23, status: "New", paid: true }],
    },
    { number: "102", type: "1 bed", status: "Clean up", bookings: [] },
    {
      number: "103",
      type: "1 bed",
      status: "Dirty",
      bookings: [
        { id: "A-45", start: 7, end: 21, status: "Confirmed", paid: true },
      ],
    },
    { number: "104", type: "1 bed", status: "Ready", bookings: [] },
    {
      number: "105",
      type: "2 beds",
      status: "Ready",
      bookings: [
        { id: "A-58", start: 6, end: 14, status: "Arrived", paid: true },
      ],
    },
    { number: "201", type: "2 beds", status: "Dirty", bookings: [] },
    {
      number: "202",
      type: "2 beds",
      status: "Ready",
      bookings: [
        { id: "A-28", start: 4, end: 18, status: "Checked Out", paid: true },
      ],
    },
    { number: "203", type: "3 beds", status: "Clean up", bookings: [] },
    { number: "204", type: "3 beds", status: "Clean up", bookings: [] },
    { number: "301", type: "4 beds", status: "Dirty", bookings: [] },
    { number: "302", type: "4 beds", status: "Dirty", bookings: [] },
  ];

  // Add event listeners for navigation buttons
  document.getElementById("prev-month").addEventListener("click", () => {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    updateCalendar();
  });

  document.getElementById("next-month").addEventListener("click", () => {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    updateCalendar();
  });

  document.getElementById("today").addEventListener("click", () => {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    updateCalendar();
  });

  // Initial load
  updateCalendar();
});
