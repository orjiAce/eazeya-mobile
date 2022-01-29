import React from 'react'
import {AnimatedTabBarNavigator, DotSize, TabElementDisplayOptions} from 'react-native-animated-nav-tab-bar'
import {Feather as Icon} from '@expo/vector-icons'
import Dashboard from "../screens/Dashboard";
import UserProfile from "../screens/UserProfile";
import Colors from "../constants/Colors";
import RideHistory from "../screens/RideHistory";
import ChatScreen from "../screens/ChatScreen";


const Tabs = AnimatedTabBarNavigator()


const TabBarIcon = (props: any) => {
    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.tintColor}
        />
    )
}


export default () => (
    <Tabs.Navigator backBehavior='history' screenOptions={{
        animation: 'slide_from_right'
    }}

                    initialRouteName="Home"
                    tabBarOptions={{
                        labelStyle: {fontSize: 12, fontFamily: 'GT-medium'},
                        activeTintColor: "#ffffff",
                        inactiveTintColor: "#9e9e9e",
                        activeBackgroundColor: Colors.primaryColor
                    }}
                    appearance={{

                        dotCornerRadius: 10,
                        shadow: true,
                        floating: false,
                        whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
                        dotSize: DotSize.SMALL
                    }}
    >
        <Tabs.Screen

            name="Dashboard"
            component={Dashboard}
            options={{

                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="package"
                    />
                ),

            }}
        />

        <Tabs.Screen
            name="History"
            component={RideHistory}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="file-text"
                    />
                ),
            }}
        />


        <Tabs.Screen
            name="Support"
            component={ChatScreen}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="message-circle"
                    />
                ),
            }}
        />

        <Tabs.Screen
            name="Profile"
            component={UserProfile}
            options={{
                tabBarIcon: ({focused, color}) => (
                    <TabBarIcon
                        focused={focused}
                        tintColor={color}
                        name="user"
                    />

                ),
            }}
        />

    </Tabs.Navigator>
)
