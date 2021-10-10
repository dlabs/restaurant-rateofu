import React, { useEffect, useState } from "react";

import { getRoles } from "api/staff-api";
import { StaffRoles } from "./staff-roles.enum";

import styles from "./Auth.module.css";

export default function Auth() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [roles, setRoles] = useState<StaffRoles[]>([]);

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

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <form action="#" className={styles.form}>
                <div className={styles.frontSignIn}>
                    <input type="text" placeholder="Name" />
                    <div className={styles.select}>
                        <select>
                            {roles.map((role) => (
                                <option value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <input
                        className={styles.signinSubmit}
                        type="submit"
                        value="Go"
                    />
                </div>
            </form>
        </div>
    );
}
