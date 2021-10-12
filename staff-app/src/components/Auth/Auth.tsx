import React, { useEffect, useState } from "react";

import { useAppDispatch } from "store";
import { getRoles } from "api/staff-api";
import { StaffRoles } from "./staff-roles.enum";
import { authenticate } from "store/slices/staff-slice.reducer";

import styles from "./Auth.module.css";

export default function Auth() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [roles, setRoles] = useState<StaffRoles[]>([]);
    const [name, setName] = useState("");
    const [selectedRole, setSelectedRole] = useState<StaffRoles>(StaffRoles.BARTENDER);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const roles = await getRoles();

                setRoles(roles);
            } finally {
                setIsLoaded(true);
            }
        };

        loadRoles();
    }, []);

    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!name || !selectedRole) return;

        await dispatch(
            authenticate({
                name,
                role: selectedRole,
            })
        );
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <form action="#" className={styles.form} onSubmit={submitForm}>
                <div className={styles.frontSignIn}>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className={styles.select}>
                        <select
                            onChange={(e) =>
                                setSelectedRole(e.target.value as StaffRoles)
                            }
                            
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className={styles.signinSubmit}
                        type="submit"
                        value="Go"
                        disabled={!name || !selectedRole}
                    />
                </div>
            </form>
        </div>
    );
}
