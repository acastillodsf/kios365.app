import { Icon } from "@iconify/react";
import React from "react";

const styles = {
    card2: {
        maxWidth: "200px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: "16px",
        margin: '5px',
        // border: "1px solid #e2e8f0",
        // border: "1px solidrgba(245, 2, 2, 0.44)",
        textAlign: "center",
    },

    image: {
        width: "100%",
        height: "100px",
        objectFit: "cover",
        borderRadius: "8px",
    },
    title: {
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#1a202c",
        marginTop: "10px",
    },
    text: {
        color: "#4a5568",
        margin: "0px",
    },
    status: (estatus) => ({
        marginTop: "14px",
        fontWeight: "600",
        color: estatus === "✅ Conectado" ? "#38a169" : "#e53e3e",
    }),
    card: (estatus) => ({
        maxWidth: "200px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        padding: "16px",
        margin: '5px',
        // border: "1px solid #e2e8f0",
        // border: "1px solidrgba(245, 2, 2, 0.44)",
        textAlign: "center",
        color: estatus === "✅ Conectado" ? "#38a169" : "#e53e3e",
    }),
};

const EquipoCard = ({ nombre = 'KIOSKO', posicion = 'SUCURSAL', estatus = 'Desconectado', sku = "", icon = "icon-park-outline:phone-booth" }) => {
    return (
        <div style={styles.card(estatus)}>
            <Icon icon={icon} style={styles.image} />
            <h2 style={styles.title}>{nombre}</h2>
            <p style={styles.text}>{posicion}</p>
            <p style={styles.text}>{sku}</p>
            <p style={styles.status(estatus)}>{estatus}</p>
        </div>
    );
};

export default EquipoCard;

