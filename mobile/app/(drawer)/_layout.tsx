import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }} />
    // <Drawer>
    //   <Drawer.Screen name="education" options={{ title: 'Education' }} />
    //   <Drawer.Screen name="experience" options={{ title: 'Experience' }} />
    //   <Drawer.Screen name="techstack" options={{ title: 'Tech Stack' }} />
    //   <Drawer.Screen name="category" options={{ title: 'Categories' }} />
    //   <Drawer.Screen name="project" options={{ title: 'Projects' }} />
    //   <Drawer.Screen name="news" options={{ title: 'News' }} />
    //   <Drawer.Screen name="testimonial" options={{ title: 'Testimonials' }} />
    // </Drawer>
  );
}
