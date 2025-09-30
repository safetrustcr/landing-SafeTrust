import { FC } from "react";
import { SecurityFeatureType } from "../../data/security-features";

const SecurityFeature: FC<{ feature: SecurityFeatureType }> = ({ feature }) => (
  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-6 w-72 flex flex-col items-center">
    <div className="mb-4 animate-bounce">{feature.icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
    <p className="text-gray-700 dark:text-gray-300 text-center mb-2">
      {feature.description}
    </p>
    <div className="mt-2 text-green-600 font-bold">
      Trust Score: {feature.trustScore}/100
    </div>
    {feature.compliance && (
      <div className="mt-1 text-xs text-blue-500">{feature.compliance}</div>
    )}
  </div>
);

export default SecurityFeature;
