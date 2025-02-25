// lib/firestoreOperations.js
import { db } from './firabase';
import { collection, getDocs, addDoc, query, where, deleteDoc, getDoc, doc, updateDoc, arrayRemove, DocumentData, DocumentSnapshot } from 'firebase/firestore';


interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  status: string;
  Engineers: { EmploymentStatus: string, Email: string, Company: string, Name: string }[]
  Clients: { NIC: string, Email: string, Name: string }[];
  Components: { id: string, componentName: string, startDate: string, endDate: string, returnedDate: string, panelty: number }[];
}
const getProjects = async (): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, 'projects');
    const projectSnapshot = await getDocs(projectsRef);
    const projectList = projectSnapshot.docs.map(doc => doc.data() as Project);
    return projectList;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};
const getProjectFromId = async (id: number): Promise<Project | null> => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const projectData = querySnapshot.docs[0].data() as Project;
      return projectData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

const addProject = async (projectData: { id: number, projectName: string, projectDescription: string, status: string }) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      id: projectData.id,
      projectName: projectData.projectName,
      projectDescription: projectData.projectDescription,
      status: projectData.status,
    });
  } catch (error) {
    console.error("Error adding project: ", error);
    throw new Error('Failed to add project');
  }
};


const deleteProjectFromFirestoreById = async (id: number) => {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('id', '==', id));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await deleteDoc(docRef);
  } else {
    throw new Error('Project not found');
  }
};

const addData = async (projectId: number, dataToSave: any, status: string) => {
  console.log("project id:", projectId);
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("id", "==", projectId));

    const projectSnapshot = await getDocs(q);

    const projectDoc = projectSnapshot.docs[0];
    const projectRef = projectDoc.ref;

    await updateDoc(projectRef, dataToSave);
    console.log("Updated data:", dataToSave);
    alert(`${status.charAt(0).toUpperCase() + status.slice(1)} added successfully!`);
  } catch (error) {
    console.error("Error adding data to project:", error);
    alert("Failed to add data.");
  }
};

const deleteComponentById = async (componentId: string) => {
  try {
    console.log("Deleting component with ID:", componentId);

    // Get all projects
    const projectsRef = collection(db, "projects");
    const projectSnapshot = await getDocs(projectsRef);

    let projectToUpdate: DocumentData | null = null;
    let componentToRemove: any = null;

    // Find the project that contains the component
    projectSnapshot.forEach((doc) => {
      const projectData = doc.data();
      const component = projectData.Components?.find((comp: any) => comp.id === componentId);

      if (component) {
        projectToUpdate = doc;
        componentToRemove = component;
      }
    });

    if (!projectToUpdate || !componentToRemove) {
      console.error("Component not found in any project.");
      alert("Component not found.");
      return;
    }

    // Get reference to the Firestore document
    const projectRef = (projectToUpdate as DocumentSnapshot).ref;

    // Remove the component from the array
    await updateDoc(projectRef, {
      Components: arrayRemove(componentToRemove),
    });

    console.log("Component deleted successfully.");
  } catch (error) {
    console.error("Error deleting component:", error);
    alert("Failed to delete component.");
  }
};

export { getProjects, addProject, deleteProjectFromFirestoreById, getProjectFromId, addData, deleteComponentById };
