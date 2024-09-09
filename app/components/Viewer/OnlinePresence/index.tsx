'use client'

import { OnlinePresenceProps } from "@/app/constants/CustomProps";
import { Popup, PopupContent, PopupHeader } from "semantic-ui-react";

export const OnlinePresence: React.FC<OnlinePresenceProps> = (props) => {

    const onlineUserIDs = Array.from(props.presence.keys()).map(userID => {
        const user = props.presence.get(userID);
        if(user && user.name && user.color){
            const customStyle = {
                display: "flex",
                height: "30px",
                width: "30px",
                borderRadius: "100px",
                background: user.color,
            }
            const currentActivityFocus = props.activities.get(user.id_focus);
            if(user.id_focus && currentActivityFocus){
                return (
                    <Popup
                        trigger={
                            <div key={user.email} style={customStyle}>
                                <p style={{margin: "auto", color: "white", mixBlendMode: "difference"}}>
                                {user.name.split(" ").map(name => {return name[0]})}
                                </p>
                            </div>
                        }
                    >
                    <PopupHeader>{user.name}</PopupHeader>
                    <PopupContent>
                        <span>Viewing: {currentActivityFocus[0].title}</span>
                    </PopupContent>
                    </Popup>
                )
            }else{
                return (
                    <Popup
                        trigger={
                            <div key={user.email} style={customStyle}>
                                <p style={{margin: "auto", color: "white", mixBlendMode: "difference"}}>
                                {user.name.split(" ").map(name => {return name[0]})}
                                </p>
                            </div>
                        }
                    >
                    <PopupHeader>{user.name}</PopupHeader>
                    <PopupContent>
                        <span>Viewing: None</span>
                    </PopupContent>
                    </Popup>
                )
            }
        }
    })
    
    return (
        <div style={{display: "flex", flexDirection: "row-reverse" }}>
            {onlineUserIDs}
        </div>
    );
}