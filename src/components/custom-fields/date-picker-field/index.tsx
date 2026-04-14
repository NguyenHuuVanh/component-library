"use client";
import type { FC, ReactNode } from "react";
import type { CalendarProps } from "@/components/shadcn-ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useId, useMemo, useState } from "react";
import { PiCalendarDots } from "react-icons/pi";
import { Button } from "@/components/shadcn-ui/button";
import { useDisclosure } from "@/hooks/use-disclosure";
import { cn } from "@/utils/cn";
import WapperField from "../wapper-field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type DatePickerFieldProps = {
  name?: string;
  selected?: Date;
  selectedForm?: Date;
  selectedTo?: Date;
  mode?: CalendarProps["mode"];
  numberOfMonths?: number;
  placeholder?: string;
  onSelect?: (...arg: any) => void;
  formatStr?: string;
  calendarProps?: Pick<
    CalendarProps,
    | "toYear"
    | "fromYear"
    | "captionLayout"
    | "components"
    | "classNames"
    | "disabled"
    | "locale"
    | "fromMonth"
  >;
  defaultMonth?: Date;
  contentFooter?: ReactNode;
  classContent?: string;
  buttonClassName?: string;
  label?: string;
  required?: boolean;
  msgError?: string;
  classWapper?: string;
};

export const DatePickerField: FC<DatePickerFieldProps> = ({
  name,
  selected,
  label,
  required,
  msgError,
  mode = "single",
  numberOfMonths = 1,
  placeholder = "Chọn ngày",
  selectedForm,
  selectedTo,
  onSelect,
  formatStr = "dd/MM/yyyy",
  calendarProps,
  defaultMonth,
  contentFooter,
  classContent,
  classWapper,
  buttonClassName,
}) => {
  const selectId = useId();
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const isPlaceholder = !(selected || selectedForm || selectedTo);

  const valueDate = useMemo(() => {
    if (mode === "single") {
      return {
        mode,
        selected,
        onSelect,
      };
    } else if (mode === "range") {
      return {
        mode,
        selected: {
          to: selectedTo,
          from: selectedForm,
        },
        onSelect,
      };
    }
    return {};
  }, [mode, selected, selectedTo, selectedForm, onSelect]);

  const valueButton = useMemo((): ReactNode => {
    if (isPlaceholder) {
      return <span>{placeholder}</span>;
    }
    if (mode === "single" && selected) {
      return format(selected, formatStr, { locale: vi });
    } else if (mode === "range" && selectedForm) {
      return `${format(selectedForm, formatStr, { locale: vi })}${selectedTo ? ` - ${format(selectedTo, formatStr, { locale: vi })}` : ""}`.trim();
    }
  }, [
    selected,
    formatStr,
    placeholder,
    isPlaceholder,
    mode,
    selectedForm,
    selectedTo,
  ]);

  const handleSingleChange = (date: Date | null) => {
    onSelect?.(date || undefined);
    onClose();
  };

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    onSelect?.({
      from: start || undefined,
      to: end || undefined,
    });
    if (start && end) {
      onClose();
    }
  };

  return (
    <>
      <input
        type="hidden"
        name={name || ""}
        value={selected ? selected.toISOString() : ""}
      />
      <WapperField
        label={label}
        required={required}
        msgError={msgError}
        classWapper={classWapper}
      >
        <div className={cn("grid gap-2 w-full")}>
          <div className="relative">
            <Button
              id={selectId}
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal shadow-sm",
                isPlaceholder && "text-muted-foreground",
                buttonClassName,
              )}
              onClick={() => onOpenChange(!isOpen)}
            >
              <PiCalendarDots className="mr-2 h-4 w-4" />
              {valueButton}
            </Button>
            {isOpen && (
              <div className="absolute z-50 mt-1 bg-popover rounded-md border shadow-md p-2">
                <DatePicker
                  selected={
                    mode === "single" ? selected || null : selectedForm || null
                  }
                  onChange={
                    mode === "single"
                      ? handleSingleChange
                      : (handleRangeChange as any)
                  }
                  startDate={selectedForm || null}
                  endDate={selectedTo || null}
                  selectsRange={mode === "range"}
                  monthsShown={numberOfMonths}
                  inline
                  locale={vi}
                  minDate={calendarProps?.fromMonth}
                  maxDate={
                    calendarProps?.toYear
                      ? new Date(calendarProps.toYear, 11, 31)
                      : undefined
                  }
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className={cn("w-full", classContent)}
                />
                {contentFooter}
              </div>
            )}
          </div>
        </div>
      </WapperField>
    </>
  );
};
