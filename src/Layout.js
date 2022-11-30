import { React } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Divider,
  Center,
  Text,
} from "@chakra-ui/react";
import Routing from "./routes/config";

export const navData = [
  [Routing.Proyectos, "Proyectos"],
  [Routing.Tickets, "Soporte"],
  [Routing.Recursos, "Recursos"],
];

const NavLink = (props) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={props.href}
  >
    {props.children}
  </Link>
);

export default function Layout(props) {
  const [searchParams] = useSearchParams();
  const qParams = "?" + searchParams.toString();
  const navLinks = props.navData.map(([href, text]) => (
    <NavLink key={href} href={href + qParams}>
      {text}
    </NavLink>
  ));
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent="space-between">
          <HStack spacing={8} alignItems={"center"}>
            <NavLink href={Routing.Home + qParams}>{<b>Home</b>}</NavLink>
            <Center height={12}>
              <Divider orientation="vertical" />
            </Center>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {navLinks}
            </HStack>
          </HStack>
          <Text width="20%" fontSize={20} fontWeight="bolder">
            {props.title}
          </Text>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                cursor={"pointer"}
                rightIcon={
                  <Avatar
                    size={"sm"}
                    src={
                      "https://banner2.cleanpng.com/20180625/krr/kisspng-computer-icons-user-profile-5b307165139246.8860442615299014130802.jpg"
                    }
                  />
                }
              >
                <Text mr={3}>{props.usuario}</Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={props.logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  );
}
