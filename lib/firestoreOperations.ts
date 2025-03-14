// lib/firestoreOperations.js
import { toast } from 'react-toastify';
import { db } from './firabase';
import { collection, getDocs, addDoc, query, where, deleteDoc, getDoc, doc, updateDoc, arrayRemove, DocumentData, DocumentSnapshot, arrayUnion } from 'firebase/firestore';


interface Project {
  id: number;
  projectName: string;
  projectDescription: string;
  status: string;
  ProjectManager: { Email: string, Company: string, Name: string, Mobiel: string };
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
    toast.success("Project added successfully!", { position: "bottom-right", });
  } catch (error) {
    console.error("Error adding project: ", error);
    toast.error("Failed to add project.", { position: "bottom-right", });
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
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("id", "==", projectId));

    const projectSnapshot = await getDocs(q);

    const projectDoc = projectSnapshot.docs[0];
    const projectRef = projectDoc.ref;

    await updateDoc(projectRef, dataToSave);
    toast.success(`${status.charAt(0).toUpperCase() + status.slice(1)} added successfully!`, {
      position: "bottom-right",
    });
  } catch (error) {
    console.error("Error adding data to project:", error);
    toast.error(`Failed to add ${status}.`, { position: "bottom-right", });
  }
};

const deleteComponentById = async (componentId: string) => {
  try {
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
      toast.error("Component not found.", {
        position: "bottom-right",
      });
      return;
    }

    // Get reference to the Firestore document
    const projectRef = (projectToUpdate as DocumentSnapshot).ref;

    // Remove the component from the array
    await updateDoc(projectRef, {
      Components: arrayRemove(componentToRemove),
    });

    //console.log("Component deleted successfully.");
    toast.success("Component deleted successfully.", {
      position: "bottom-right",
    });
  } catch (error) {
    console.error("Error deleting component:", error);
    //alert("Failed to delete component.");
    toast.error("Failed to delete component.", {
      position: "bottom-right",
    });
  }
};

export const updateReturnedDate = async (componentId: string, returnedDate: string) => {
  //console.log(`Updating returned date for component: ${componentId}`);
  try {
    const projectsRef = collection(db, "projects");
    const projectSnapshot = await getDocs(projectsRef);

    let projectToUpdate: DocumentSnapshot | null = null;
    let componentToUpdate: any = null;

    // Find the project that contains the component
    projectSnapshot.forEach((doc) => {
      const projectData = doc.data();
      const component = projectData.Components?.find((comp: any) => comp.id === componentId);

      if (component) {
        projectToUpdate = doc;
        componentToUpdate = component;
      }
    });

    if (!projectToUpdate || !componentToUpdate) {
      console.error("Component not found in any project.");
      toast.error("Component not found.", { position: "bottom-right" });
      return false;
    }

    // Get reference to the Firestore document
    const projectRef = (projectToUpdate as DocumentSnapshot).ref;

    // Remove old component and add updated one
    await updateDoc(projectRef, {
      Components: arrayRemove(componentToUpdate),
    });

    // Update the component with the new returned date
    const updatedComponent = { ...componentToUpdate, returnedDate };

    await updateDoc(projectRef, {
      Components: arrayUnion(updatedComponent),
    });
    console.log("Returned date updated successfully!");
    toast.success("Returned date updated successfully.", { position: "bottom-right" });
    return true;
  } catch (error) {
    console.error("Error updating returned date:", error);
    toast.error("Failed to update returned date.", { position: "bottom-right" });
    return false;
  }
};



export { getProjects, addProject, deleteProjectFromFirestoreById, getProjectFromId, addData, deleteComponentById };
