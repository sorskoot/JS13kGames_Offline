out_name = ((GetDir #export)+"/puzzle.txt")
out_file = createfile out_name

fn round x = (floor((100*x)+0.5)/100)

numobj = objects.count
format "[\n" to:out_file
for o = 1 to numobj do
(
	obj = objects[o]
	type = case obj.modifiers[1].materialID of
	(	
		1: "start"
		2: "end"
		3: "mirror"
		4: "wall"
	)
	format "{" to:out_file
	format "type:'%'," type to:out_file
	format "pos:[%, %, %]," (round obj.position.x) ((round obj.position.z)+.5) (round obj.position.y) to:out_file
	format "rot:%," (((mod ((obj.rotation as eulerAngles).z + 540) 360) / 90) as integer) to:out_file
	format "},\n" to:out_file
)
  
format "]\n"  to:out_file
close out_file
/*
 [{
                    type: 'start',
                    pos: [5, 0.5, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'end',
                    pos: [1, 0.5, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'mirror',
                    pos: [1, 0.5, 1],
                    rot: 0
                },
                {
                    type: 'mirror',
                    pos: [5, 0.5, 1],
                    rot: 0
                },
                {
                    type: 'wall',
                    pos: [3, 0.5, 5],
                    rot: 0
                }
            ]
			
			*/