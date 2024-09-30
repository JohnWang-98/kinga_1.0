import TabsContent from "@/components/atoms/tabs/content";
import TabsTrigger from "@/components/atoms/tabs/trigger";
import ITrigger from "@/components/atoms/tabs/trigger/trigger.interface";
import React, { useState } from "react";
import { View } from "react-native";
import ITab from "./tab.interface";

export default function Tabs({ defaultValue, children }: ITab) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <View>
      <View className="flex-row rounded-full bg-[#E2E8F0] w-full p-1 drop-shadow-2xl">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;

          if (child.type === TabsTrigger) {
            return React.cloneElement(child, {
              isActive: activeTab === child.props.value,
              onPress: () => setActiveTab(child.props.value),
            } as ITrigger);
          }

          return null;
        })}
      </View>
      <View>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;

          if (child.type === TabsContent && child.props.value === activeTab) {
            return child;
          }

          return null;
        })}
      </View>
    </View>
  );
}
