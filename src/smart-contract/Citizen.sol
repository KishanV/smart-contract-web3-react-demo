pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

contract CitizenStorage {
    struct Citizen {
        uint id;
        string name;
        uint age;
        string city;
        string note;
    }

    Citizen[] citizens;

    constructor() public {
        addCitizen(1, 32, "Abu Dhabi", "John", "Some of John's notes");
        addCitizen(2, 22, "Dubai", "Ali", "Some of Ali's notes");
        addCitizen(2, 56, "Dubai", "Jessica", "Some of Jessica's notes");
        addCitizen(3, 44, "Dubai", "James", "Some of Jessica's notes");
        addCitizen(4, 41, "Abu Dhabi", "Alla", "Some of Alla's notes");
        addCitizen(5, 18, "Abu Dhabi", "Patrick", "Some of Patrick's notes");
        addCitizen(6, 18, "Ajman", "Bob", "Some of Bob's notes");
        addCitizen(7, 33, "Ajman", "Alice", "Some of Alice's notes");
        addCitizen(8, 42, "Ras Al Khaimah", "Dan", "Some of Dan's notes");
        addCitizen(9, 20, "Sharjah", "Tim", "Some of Tim's notes");
    }

    function addCitizen(
        uint id,
        uint age,
        string memory city,
        string memory name,
        string memory someNote
    ) public {
        Citizen memory e = Citizen(id, name, age, city, someNote);
        citizens.push(e);
    }

    function getCitizen(uint id)
        public
        view
        returns (
            string memory,
            uint,
            string memory
        )
    {
        uint i;
        for (i = 0; i < citizens.length; i++) {
            Citizen memory e = citizens[i];
            if (e.id == id) {
                return (e.name, e.age, e.city);
            }
        }

        return ("", 0, "");
    }

    function getCitizenByIndex(uint index)
        public
        view
        returns (
            uint,
            string memory,
            uint,
            string memory
        )
    {
        if (index > citizens.length - 1) {
            return (0, "", 0, "");
        }
        Citizen memory citizen = citizens[index];
        return (citizen.id, citizen.name, citizen.age, citizen.city);
    }

    function getNoteByCitizenIndex(uint index)
        external
        view
        returns (string memory)
    {
        if (index > citizens.length - 1) {
            return ("");
        }
        Citizen memory citizen = citizens[index];
        return (citizen.note);
    }

    function getCount() public view returns (uint count) {
        return uint(citizens.length);
    }

    function fetchCitizens(uint cursor, uint256 howMany)
        public
        view
        returns (Citizen[] memory values, uint256 newCursor)
    {
        uint256 length = howMany;
        if (length > citizens.length - cursor) {
            length = citizens.length - cursor;
        }

        values = new Citizen[](length);
        for (uint256 i = 0; i < length; i++) {
            values[i] = citizens[cursor + i];
        }

        return (values, cursor + length);
    }
}
