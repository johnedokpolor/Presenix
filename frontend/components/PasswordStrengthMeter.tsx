import { Check, X } from "lucide-react";

// Interface for password prop
interface Password {
  password: string;
}

const PasswordCriteria: React.FC<Password> = ({ password }) => {
  // Criterias to check password strength
  const criteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
  return (
    <div className="mt-2 space-y-1">
      {/*  Prints all criterias to the screen */}
      {criteria.map((item, index) => (
        <div key={index} className="flex text-xs">
          {/* Checks if individual criterias and met and update the UI */}
          {item.met ? (
            <Check className="size-4 text-green-700 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span
            className={item.met ? "text-green-700" : "text-gray-500"}
          ></span>
          <span className={item.met ? "text-green-700" : "text-gray-500"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter: React.FC<Password> = ({ password }) => {
  // Increases of the password by checking the criterias
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };
  // Sets updated strength
  const strength = getStrength(password);

  // Get unique colors according to strength
  const getColor = (strength: number) => {
    if (strength === 0) return "bg-red-600";
    if (strength === 1) return "bg-orange-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-700";
  };

  // Get unique text according to strength
  const getStrengthText = (strength: number) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };
  const width = `${(strength / 4) * 100}%`;
  console.log("Password Strength:", strength);
  console.log("Width:", width);
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-700">Password Strength</span>
        <span className="text-xs text-gray-700">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {/* Creates an array of "4" and maps through it to create 4 div
        components */}

        <div className="h-2 w-full bg-gray-300  rounded-full  ">
          <div
            className={` h-2 transition-all rounded-full duration-500  ${getColor(
              strength
            )}`}
            style={{ width: width }}
          ></div>
        </div>
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
