import { Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

// import type { RouterOutputs } from "~/utils/api";
// import { api } from "~/utils/api";
import { useSignIn, useSignOut, useUser } from "~/utils/auth";

export function PostCard(
  props: Readonly<{
    onDelete: () => void;
  }>,
) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Link asChild href="/">
          <Pressable className="">
            <Text className="text-xl font-semibold text-primary">Title</Text>
            <Text className="mt-2 text-foreground">CONTENT</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  );
}

function MobileAuth() {
  const user = useUser();
  const signIn = useSignIn();
  const signOut = useSignOut();

  return (
    <>
      <Text className="pb-2 text-center text-xl font-semibold text-white">
        {user ?? "Not logged in"}
      </Text>
      <Button
        onPress={() => (user ? signOut() : signIn())}
        title={user ? "Sign Out" : "Sign In With Discord"}
        color={"#5B65E9"}
      />
    </>
  );
}

export default function Index() {
  // const utils = api.useUtils();

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <MobileAuth />

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
