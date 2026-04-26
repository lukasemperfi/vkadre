import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Tabs from "./index.vue";
import TabsTrigger from "./Trigger.vue";
import TabsPanel from "./Panel.vue";
import TabsList from "./List.vue";

const meta: Meta<typeof Tabs> = {
  tags: ["autodocs"],
  component: Tabs,
};

export default meta;

export const Default: StoryObj = {
  render: () => ({
    components: { Tabs, TabsTrigger, TabsPanel, TabsList },
    setup() {
      const activeTab = ref("orders");
      return { activeTab };
    },
    template: `
      <Tabs v-model="activeTab">
          <TabsList>
            <TabsTrigger id="dashboard">
              Dashboard
            </TabsTrigger>
            <TabsTrigger id="orders">
              Orders
            </TabsTrigger>
            <TabsTrigger id="addresses">
              Addresses
            </TabsTrigger>
            <TabsTrigger id="settings">
              Settings
            </TabsTrigger>
            <TabsTrigger id="help">
              Help
            </TabsTrigger>
            <TabsTrigger id="support">
              Support
            </TabsTrigger>
            <TabsTrigger id="profile">
              Profile
            </TabsTrigger>
            <TabsTrigger id="contacts">
              Contacts
            </TabsTrigger>
            <TabsTrigger id="logout">
              Logout
            </TabsTrigger>

          </TabsList>
        
        <div class="tabs-content-container">
          <TabsPanel id="dashboard">
            <div>
              <div >Ethereum Card</div>
              <div >Solana Card</div>
            </div>
          </TabsPanel>
          
          <TabsPanel id="orders">
            <div>
              <p>No recent transactions found.</p>
            </div>
          </TabsPanel>

          <TabsPanel id="addresses">
            <div>
              <p> Some addresses </p>
            </div>
          </TabsPanel>
        </div>
      </Tabs>
    `,
  }),
};
