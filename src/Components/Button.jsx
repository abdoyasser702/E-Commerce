import { cva } from "class-variance-authority";
function Button({
  value,
  variant,
  type = "button",
  disabled = false,
  ...props
}) {
  const button = cva(
    "flex justify-center font-medium py-4 px-12 rounded-[4px] h-14 whitespace-nowrap transition duration-300 ease-in-out shadow-md hover:shadow-lg",
    {
      variants: {
        variant: {
          primary: "text-[#FAFAFA] bg-[#DB4444] hover:bg-[#b73131]",
          secondary: "text-[#FAFAFA] bg-[#00FF66] hover:bg-[#00cc52]",
        },
        disabled: {
          true: "bg-gray-400 cursor-not-allowed text-[#fafafa] hover:bg-gray-400", // 👈 لما يبقى disabled
          false: "",
        },
      },
      defaultVariants: {
        variant: "primary",
        disabled: false,
      },
    }
  );
  return (
    <button
      disabled={disabled}
      type={type}
      className={button({ variant, disabled })}
      {...props}
    >
      {value}
    </button>
  );
}

export default Button;
