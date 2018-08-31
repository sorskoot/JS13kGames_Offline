fn round2 x = (floor((100*x)+0.5)/100)

tmesh = snapshotAsMesh selection[1]
num_verts = tmesh.numverts
num_faces = tmesh.numfaces
num_tverts = tmesh.numtverts 

format "%, %, %\n" num_verts num_faces num_tverts
format "Verts:\n"

for v = 1 to num_verts do
(
 vert = getVert tmesh v
 format "%,%,%," (round2 vert.x) (round2 vert.z) (round2 vert.y) 
)

format "\nFaces:\n"
for f = 1 to num_faces do
(
 face = getFace tmesh f
 format "%,%,%, " ((face[1]-1) as Integer) ((face[2]-1) as Integer) ((face[3]-1) as Integer)
)

format "\nTVFaces:\n"
for f = 1 to num_faces do
(
  tvface = getTVFace tmesh f
  --format "%,%,%, " ((tvface[1]-1) as Integer) ((tvface[2]-1) as Integer) ((tvface[3]-1) as Integer)
  uvw1 = getTVert tmesh tvface[1]
  uvw2 = getTVert tmesh tvface[2]
  uvw3 = getTVert tmesh tvface[3]
  format "%,%, " (round2 uvw1[1]) (round2 uvw1[2]) 
  format "%,%, " (round2 uvw2[1]) (round2 uvw2[2]) 
  format "%,%,  " (round2 uvw3[1]) (round2 uvw3[2]) 
)


format "\nUVW:\n"
for t = 1 to num_tverts do
(
 uvw = getTVert tmesh t
 format "%,%, " (round2 uvw[1]) (round2 uvw[2]) 
)
format "\n"
format "\n"

foo = #()

for f = 1 to num_faces do
(
	face = getFace tmesh f
	
	tvface = getTVFace tmesh f
	--format "%," tvface
	
	tvert = getTVert tmesh tvface[1]
	foo[face[1]] = [(round2 tvert[1]), (round2 tvert[2])];
	
	format "%: " (face[1] as Integer)
	format "%, %, " (round2 tvert[1]) (round2 tvert[2])
	format "\n"
	
	tvert = getTVert tmesh tvface[2]
	foo[face[2]] = [(round2 tvert[1]), (round2 tvert[2])];
	format "%: " (face[2] as Integer)
	format "%, %, " (round2 tvert[1]) (round2 tvert[2])
	format "\n"
	
	tvert = getTVert tmesh tvface[3]
	foo[face[3]] = [(round2 tvert[1]), (round2 tvert[2])];
	format "%: " (face[3] as Integer)
	format "%, %, " (round2 tvert[1]) (round2 tvert[2])
	format "\n"
)

for v = 1 to num_verts do (
		format "%,%, " foo[v][1]  foo[v][2]
)
