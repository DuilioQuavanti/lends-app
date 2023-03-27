import { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import { getToken, selectUserBusiness } from "../features/authSlice";
import { selectUser } from "../features/authSlice";
import { selectCategories, setCategories } from "../features/categoriesSlice";
import {
  useGetBusinessQuery,
  useLazyGetBusinessQuery,
} from "../services/businessApi";
import {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
} from "../services/categoriesApi";

function HomeScreen() {
  const userInfo = useSelector(selectUser);

  const navigator = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState();
  const { data, error, loading, refetch } = useGetCategoriesQuery();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  });

  useEffect(() => {
    data && setFeaturedCategories(data.data);
  }, [data]);

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https:links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">
            Hola {userInfo.fullname}
          </Text>
          <TouchableOpacity onPress={() => navigator.navigate("Address")}>
            <Text className="font-bold text-xl">
              Ubicación actual
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </TouchableOpacity>
        </View>
        <UserIcon
          size={35}
          color="#00CCBB"
          onPress={() => navigator.navigate("Profile")}
        />
      </View>

      {/* Search */}
      <View className="flex-row  items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 ">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput placeholder="Rentas accesibles" keyboardType="default" />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories />
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
