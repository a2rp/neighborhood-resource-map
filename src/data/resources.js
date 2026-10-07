const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const isOpenToday = (resource) => {
    const schedule = resource.hours.split(",")[0];

    if (schedule === "Daily") {
        return true;
    }

    const [firstDay, lastDay] = schedule.split("-");
    const currentDay = new Date().getDay();
    const firstIndex = weekdays.indexOf(firstDay);
    const lastIndex = lastDay ? weekdays.indexOf(lastDay) : firstIndex;

    if (firstIndex === -1 || lastIndex === -1) {
        return false;
    }

    return firstIndex <= lastIndex
        ? currentDay >= firstIndex && currentDay <= lastIndex
        : currentDay >= firstIndex || currentDay <= lastIndex;
};

export const resourceCategories = [
    { id: "food", label: "Food and essentials", color: "#b77a35" },
    { id: "health", label: "Health and care", color: "#537c73" },
    { id: "learning", label: "Learning", color: "#7774a0" },
    { id: "community", label: "Community", color: "#b85e4e" },
];

export const neighborhoodOptions = [
    "All neighborhoods",
    "River Ward",
    "Old Market",
    "Eastbank",
    "Hilltop",
];

export const resources = [
    {
        id: "northbank-pantry",
        name: "Northbank Community Pantry",
        category: "food",
        neighborhood: "River Ward",
        address: "18 Market Lane",
        hours: "Mon-Fri, 9 am-5 pm",
        distance: "0.3 mi",
        description: "A welcoming place to pick up pantry staples and fresh produce.",
        services: ["Fresh groceries", "Household basics", "No referral needed"],
        access: "Step-free entrance",
        position: { left: "22%", top: "31%" },
    },
    {
        id: "market-fridge",
        name: "Market Street Community Fridge",
        category: "food",
        neighborhood: "Old Market",
        address: "42 Market Street",
        hours: "Daily, 7 am-9 pm",
        distance: "0.5 mi",
        description: "A shared fridge where neighbors can leave or take fresh food.",
        services: ["Fresh food", "No appointment", "All ages"],
        access: "Street-level access",
        position: { left: "43%", top: "47%" },
    },
    {
        id: "harvest-table",
        name: "Harvest Table",
        category: "food",
        neighborhood: "Eastbank",
        address: "7 Orchard Lane",
        hours: "Tue-Sat, 10 am-4 pm",
        distance: "0.8 mi",
        description: "A community market with low-cost produce and cooking support.",
        services: ["Low-cost produce", "Cooking classes", "Family friendly"],
        access: "Step-free entrance",
        position: { left: "76%", top: "64%" },
    },
    {
        id: "family-clinic",
        name: "River Ward Family Clinic",
        category: "health",
        neighborhood: "River Ward",
        address: "9 Cedar Avenue",
        hours: "Mon-Fri, 8 am-6 pm",
        distance: "0.4 mi",
        description: "Primary care and health navigation for people in the neighborhood.",
        services: ["Primary care", "Health navigation", "Walk-in hours"],
        access: "Elevator and step-free entrance",
        position: { left: "36%", top: "22%" },
    },
    {
        id: "care-collective",
        name: "Eastbank Care Collective",
        category: "health",
        neighborhood: "Eastbank",
        address: "21 Willow Road",
        hours: "Mon-Thu, 9 am-5 pm",
        distance: "0.9 mi",
        description: "A friendly place to find family wellness and care referrals.",
        services: ["Family wellness", "Care referrals", "Private meeting rooms"],
        access: "Step-free entrance",
        position: { left: "83%", top: "39%" },
    },
    {
        id: "northbank-library",
        name: "Northbank Reading Room",
        category: "learning",
        neighborhood: "Old Market",
        address: "5 Library Square",
        hours: "Mon-Sat, 9 am-7 pm",
        distance: "0.2 mi",
        description: "Books, quiet tables, public computers, and welcoming programs.",
        services: ["Public computers", "Study tables", "Children's corner"],
        access: "Accessible entrance",
        position: { left: "52%", top: "29%" },
    },
    {
        id: "skill-lab",
        name: "Neighborhood Skill Lab",
        category: "learning",
        neighborhood: "Hilltop",
        address: "30 Juniper Street",
        hours: "Mon-Fri, 10 am-6 pm",
        distance: "1.1 mi",
        description: "Drop in for digital skills, job search help, and practical classes.",
        services: ["Computer access", "Job search help", "Free workshops"],
        access: "Step-free entrance",
        position: { left: "23%", top: "74%" },
    },
    {
        id: "cedar-hall",
        name: "Cedar Hall Community Center",
        category: "community",
        neighborhood: "Hilltop",
        address: "11 Cedar Lane",
        hours: "Daily, 8 am-8 pm",
        distance: "0.7 mi",
        description: "A shared neighborhood space for groups, meals, and local support.",
        services: ["Community meals", "Meeting space", "Family activities"],
        access: "Ramp and accessible restroom",
        position: { left: "44%", top: "78%" },
    },
    {
        id: "neighbor-desk",
        name: "Neighbor Desk",
        category: "community",
        neighborhood: "Old Market",
        address: "16 Bell Street",
        hours: "Mon-Fri, 9 am-4 pm",
        distance: "0.3 mi",
        description: "Get help finding local programs, forms, and everyday support.",
        services: ["Resource referrals", "Form help", "Multilingual support"],
        access: "Step-free entrance",
        position: { left: "62%", top: "53%" },
    },
    {
        id: "river-park",
        name: "River Park Welcome Point",
        category: "community",
        neighborhood: "River Ward",
        address: "2 Riverside Walk",
        hours: "Daily, sunrise-sunset",
        distance: "0.6 mi",
        description: "A public meeting point beside the river with shaded seating.",
        services: ["Public seating", "Water fountain", "Outdoor space"],
        access: "Paved path",
        position: { left: "12%", top: "55%" },
    },
];