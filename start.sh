
#!/bin/bash

#Variables
VAR_VAR_FILE='./var/var_var.conf'
VAR_FILE='./run/var.conf'
source $VAR_FILE
source ./source/list.conf
source ./source/functions.conf

#subsubmenu rtk settting
rtkset()   {
  local PS3='Modifier:'
  select opt in "Positionning Mode" "Model" "Elevation" "Rate" "Return"
  do
      case $opt in
          "Positionning Mode")
              Pos;;
          "Model")
              Model;;
          "Elevation")
              Elev;;
          "Rate")
              Rate;;
          "Return")
              return;;
          *) echo "invalid option $REPLY";;
      esac
  done
}
#subsubmenu InOutPut
InOutPut()   {
  local PS3='Modifier:'
  select opt in "RCV connection" "Return"
  do
      case $opt in
          "RCV connection")
              input;;
          "Return")
              return;;
          *) echo "invalid option $REPLY";;
      esac
  done
}
#subsubmenu Correction Input
corinput() {
  local PS3='Modifier:'
  select opt in "Caster Mount Point" "Caster Adresse" "Caster Port" "Caster Username" "Caster Password" "Return"
  do
      case $opt in
          "Caster Mount Point")
              MountP;;
          "Caster Adresse")
              adresse;;
          "Caster Port")
              Port;;
          "Caster Username")
              Username;;
          "Caster Password")
              Psw;;
          "Return")
              return;;
          *) echo "invalid option $REPLY";;
      esac
  done
}
#subsubmenu satellites
sat()   {
  local PS3='Modifier:'
  select opt in "GPS" "GAL" "GLO" "BDS" "QZSS"  "Return"
  do
      case $opt in
          "GPS")
              gps;;
          "GAL")
              gal;;
          "GLO")
              glo;;
          "BDS")
              bds;;
          "QZSS")
              qzss;;
          "Return")
              return;;
          *) echo "invalid option $REPLY";;
      esac
  done
}
# submenu modification
submenu () {
  local PS3='Modifier:'
  select opt in "RTK setting" "Antenna Connexion" "Caster Connexion" "Satellites" "Return"
  do
      case $opt in
          "RTK setting")
              rtkset;;
          "Antenna Connexion")
              InOutPut;;
          "Caster Connexion")
              corinput;;
	  "Satellites")
	      sat;;
          "Return")
              return;;
          *) echo "invalid option $REPLY";;
      esac
  done
}
## main menu
#First Display Parameters
Param
#Choose action...
PS3='Choisir une action: '
select opt in "Start Rover terminal" "Start Rover nodejs" "Display Param" "Modification" "Quit"
do
    case $opt in
        "Start Rover terminal")
            ## Apply new param
            ./var/parcer.sh $VAR_FILE ./var/F9P_var.cmd ./run/F9P_use.cmd &&
            ./var/parcer.sh $VAR_FILE ./var/rtkrcv_var.txt ./run/rtkrcv_use.txt &&
            ## Run RTKlib service
                if pgrep rtkrcv
                 then pkill rtkrcv && rtkrcv -s -o ./run/rtkrcv_use.txt
                 else rtkrcv -s -o ./run/rtkrcv_use.txt
                fi
            ;;
        "Start Rover nodejs")
            ## Apply new param
            ./var/parcer.sh $VAR_FILE ./var/F9P_var.cmd ./run/F9P_use.cmd &&
            ./var/parcer.sh $VAR_FILE ./var/rtkrcv_var.txt ./run/rtkrcv_use.txt &&
            ## Run RTKlib service
                if pgrep rtkrcv
                 then pkill rtkrcv && rtkrcv -s -p 5000 -m 5001 -o ./run/rtkrcv_use.txt &
                 else rtkrcv -s -p 5000 -m 5001 -o ./run/rtkrcv_use.txt &
                fi
            ## Run nodejs app
           npm start --prefix ./nodejs/read_status_reveiver &
            ;;
        "Display Param")
            Param;;
        "Modification")
            submenu;;
        "Quit")
            exit;;
        *) echo "invalid option $REPLY";;
    esac
done


