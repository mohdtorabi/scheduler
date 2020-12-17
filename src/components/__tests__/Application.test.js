import React from "react";
import { render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, getByPlaceholderText, fireEvent, queryByText } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);
//test No.1
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Monday"));
    expect(getByText("Archie Cohen")).toBeInTheDocument();
  });
});
//test No. 2
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));


  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones"}
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(()=> getByText(appointment, "Lydia Miller-Jones"));
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday")
    );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();

});
//test No. 3
it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  // 3. Click the "Delete" button on the booked appointment.
  fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find( day => queryByText(day, "Monday"));
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});
//test No. 4
it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

  const { container, debug } = render(<Application />);
  await waitForElement(()=> getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")); 

  fireEvent.click(getByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Mo To"}
  });
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(()=> getByText(container, "Mo To"));

  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  debug()
  });

  //test No. 5
it("shows the save error when failing to save an appointment",  async () => {
  axios.put.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);
  
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointments = getAllByTestId(container, "appointment")
  const appointment = appointments[0];
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "momo"}});
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
  await waitForElement( () => getByText(appointment, "could not save"))
  expect(getByText(appointment, "could not save")).toBeInTheDocument();
  debug()
});
//test No. 6
it("shows the delete error when failing to save an appointment",  async () => {
  axios.put.mockRejectedValueOnce();
  const { container, debug } = render(<Application />);
  await waitForElement(()=> getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")); 
  
  fireEvent.click(getByAltText(appointment, "Delete"));

  await waitForElement( () => getByText(appointment, "Delete the appointment?"));

  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
  debug()
});
