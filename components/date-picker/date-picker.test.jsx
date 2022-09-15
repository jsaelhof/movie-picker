import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/render-with-providers";
import DatePicker from "./date-picker";

describe("date-picker", () => {
  let props;

  beforeEach(() => {
    props = {
      defaultDate: new Date("2022-01-02T12:00:00"),
      onChange: jest.fn(),
      onCancel: jest.fn(),
      onSave: jest.fn(),
      onDelete: jest.fn(),
    };
  });

  it("should render the date picker without a drawer by default", async () => {
    const { getByTestId, queryByRole } = await renderWithProviders(
      <DatePicker {...props} />
    );

    expect(queryByRole("presentation")).not.toBeInTheDocument();
    expect(getByTestId("datePicker")).toBeInTheDocument();
  });

  it("should render the date picker in a drawer when useDrawer is true", async () => {
    const { getByTestId, queryByRole } = await renderWithProviders(
      <DatePicker {...props} useDrawer />
    );

    expect(queryByRole("presentation")).toBeInTheDocument();
    expect(getByTestId("datePicker")).toBeInTheDocument();
  });

  it("should ignore title when not in a drawer", async () => {
    const { queryByText } = await renderWithProviders(
      <DatePicker {...props} title="Test Title" />
    );

    expect(queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("should render the title when in a drawer", async () => {
    const { queryByText } = await renderWithProviders(
      <DatePicker {...props} useDrawer title="Test Title" />
    );

    expect(queryByText("Test Title")).toBeInTheDocument();
  });

  it("should set the default date", async () => {
    const { getByText, getByRole } = await renderWithProviders(
      <DatePicker {...props} />
    );
    expect(getByText("January 2022")).toBeInTheDocument();
    expect(getByRole("button", { name: "2nd January (Sunday)" })).toHaveClass(
      "rdp-day_selected"
    );
  });

  it("should call onChange when changing the date", async () => {
    const { getByRole } = await renderWithProviders(<DatePicker {...props} />);

    expect(getByRole("button", { name: "2nd January (Sunday)" })).toHaveClass(
      "rdp-day_selected"
    );

    fireEvent.click(getByRole("button", { name: "1st January (Saturday)" }));

    expect(props.onChange).toHaveBeenCalled();

    expect(
      getByRole("button", { name: "2nd January (Sunday)" })
    ).not.toHaveClass("rdp-day_selected");

    expect(getByRole("button", { name: "1st January (Saturday)" })).toHaveClass(
      "rdp-day_selected"
    );
  });

  it("should call onDelete", async () => {
    const { getByTestId } = await renderWithProviders(
      <DatePicker {...props} />
    );
    expect(getByTestId("DeleteIcon")).toBeInTheDocument();
    fireEvent.click(getByTestId("DeleteIcon"));
    expect(props.onDelete).toHaveBeenCalled();
  });

  it("should call onCancel", async () => {
    const { getByTestId } = await renderWithProviders(
      <DatePicker {...props} />
    );
    expect(getByTestId("CloseIcon")).toBeInTheDocument();
    fireEvent.click(getByTestId("CloseIcon"));
    expect(props.onCancel).toHaveBeenCalled();
  });

  it("should call onSave", async () => {
    const { getByTestId } = await renderWithProviders(
      <DatePicker {...props} />
    );
    expect(getByTestId("CalendarCheckIcon")).toBeInTheDocument();
    fireEvent.click(getByTestId("CalendarCheckIcon"));
    expect(props.onSave).toHaveBeenCalled();
  });
});
