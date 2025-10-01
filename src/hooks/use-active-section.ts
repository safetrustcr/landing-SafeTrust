import { useState } from "react";

// Hook that only stores and updates the active section
export function useActiveSection(defaultSection: string) {
    const [activeSection, setActiveSection] = useState(defaultSection);
    return { activeSection, setActiveSection };
}