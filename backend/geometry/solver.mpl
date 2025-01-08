
                read("C:/Users/mt200/OneDrive/Desktop/KnowledgeBase/DoAn/Maple/CONet_Solver.m");
                with(CONet_Solver):
                Set_Onet("problem.txt");
                SolverGiaTri(Paras_CONet, Objs_CONet, Otypes_CONet, Facts_CONet, Fkinds_CONet, Goals_CONet, Sol_CONet, Rule_Structs);
                