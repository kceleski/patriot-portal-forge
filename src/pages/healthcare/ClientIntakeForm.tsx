import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ApiService } from "@/services/apiService";
import { useApi } from "@/hooks/useApi";
import { PlusCircle, Trash2 } from "lucide-react";

// --- Zod Validation Schema ---
// This schema is derived from all the fields in your uploaded documents.
const intakeFormSchema = z.object({
  patientName: z.string().min(2, "Patient name is required."),
  facilityName: z.string().min(2, "Facility name is required."),
  reasonForVisit: z.string().optional(),
  allergies: z.string().optional(),
  levelOfCare: z.enum(["Supervisory", "Personal", "Directed"], {
    required_error: "You need to select a level of care.",
  }),
  
  medications: z.array(z.object({
    name: z.string().min(1, "Name is required."),
    dosage: z.string().min(1, "Dosage is required."),
    route: z.string().min(1, "Route is required."),
    time: z.string().min(1, "Time is required."),
    notes: z.string().optional(),
  })),

  medicationAssistance: z.enum(["None", "Some", "Full"], {
    required_error: "You need to select a medication assistance level.",
  }),

  diagnosisAndTreatments: z.string().optional(),
  dietaryRestrictions: z.string().optional(),

  functionalAbility: z.object({
    eating: z.enum(["I", "A", "D"]),
    toileting: z.enum(["I", "A", "D"]),
    transferring: z.enum(["I", "A", "D"]),
    ambulation: z.enum(["I", "A", "D"]),
    dressing: z.enum(["I", "A", "D"]),
    bathing: z.enum(["I", "A", "D"]),
  }),

  cognitiveStatus: z.object({
    orientation: z.enum(["I", "A", "D"]),
    memory: z.enum(["I", "A", "D"]),
    dementia: z.enum(["I", "A", "D"]),
    depression: z.enum(["I", "A", "D"]),
  }),

  authorizations: z.object({
    fluVaccine: z.boolean().default(false),
    tuberculinTest: z.boolean().default(false),
    covidVaccine: z.boolean().default(false),
    dnrDirective: z.boolean().default(false),
  }),
});

type IntakeFormValues = z.infer<typeof intakeFormSchema>;

// Helper array for rendering the assessment grids
const functionalAbilityItems = [
    { id: 'eating', label: 'Eating' },
    { id: 'toileting', label: 'Toileting' },
    { id: 'transferring', label: 'Transferring' },
    { id: 'ambulation', label: 'Ambulation' },
    { id: 'dressing', label: 'Dressing' },
    { id: 'bathing', label: 'Bathing' },
] as const;

const cognitiveStatusItems = [
    { id: 'orientation', label: 'Orientation' },
    { id: 'memory', label: 'Memory' },
    { id: 'dementia', label: 'Dementia' },
    { id: 'depression', label: 'Depression' },
] as const;

export function ClientIntakeForm() {
  const { execute: submitForm, loading } = useApi(ApiService.submitIntakeForm, {
      showSuccessToast: true,
      successMessage: "The patient intake form has been saved and processed.",
  });

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      patientName: "",
      facilityName: "",
      reasonForVisit: "",
      allergies: "",
      medications: [],
      functionalAbility: { eating: 'I', toileting: 'I', transferring: 'I', ambulation: 'I', dressing: 'I', bathing: 'I' },
      cognitiveStatus: { orientation: 'I', memory: 'I', dementia: 'I', depression: 'I' },
      authorizations: { fluVaccine: false, tuberculinTest: false, covidVaccine: false, dnrDirective: false },
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medications",
  });

  async function onSubmit(data: IntakeFormValues) {
    const result = await submitForm(data);
    if (result) {
        form.reset();
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <CardTitle>Comprehensive Patient Intake Form</CardTitle>
            <CardDescription>
                Digitized intake form based on the Doctor's Order, Physician's Order, and PPOC documents.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="patient-info">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="patient-info">Patient Info</TabsTrigger>
                        <TabsTrigger value="medical-orders">Medical & Diet</TabsTrigger>
                        <TabsTrigger value="assessment">Assessments</TabsTrigger>
                        <TabsTrigger value="authorizations">Authorizations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="patient-info" className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="patientName" render={({ field }) => (<FormItem><FormLabel>Patient Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="facilityName" render={({ field }) => (<FormItem><FormLabel>Current Facility</FormLabel><FormControl><Input placeholder="Sunset Senior Living" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="reasonForVisit" render={({ field }) => (<FormItem><FormLabel>Reason for Visit</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="allergies" render={({ field }) => (<FormItem><FormLabel>Allergies</FormLabel><FormControl><Input placeholder="Penicillin, Peanuts" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <FormField control={form.control} name="levelOfCare" render={({ field }) => (<FormItem className="space-y-3"><FormLabel>Level of Care</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">{['Supervisory', 'Personal', 'Directed'].map(level => (<FormItem key={level} className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value={level} /></FormControl><FormLabel className="font-normal">{level}</FormLabel></FormItem>))}</RadioGroup></FormControl><FormMessage /></FormItem>)} />
                    </TabsContent>

                    <TabsContent value="medical-orders" className="space-y-6 pt-4">
                        <Card>
                            <CardHeader><CardTitle>Medication List</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-start border p-4 rounded-lg relative">
                                        <FormField control={form.control} name={`medications.${index}.name`} render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)} />
                                        <FormField control={form.control} name={`medications.${index}.dosage`} render={({ field }) => (<FormItem><FormLabel>Dosage</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)} />
                                        <FormField control={form.control} name={`medications.${index}.route`} render={({ field }) => (<FormItem><FormLabel>Route</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)} />
                                        <FormField control={form.control} name={`medications.${index}.time`} render={({ field }) => (<FormItem><FormLabel>Time/Frequency</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)} />
                                        <FormField control={form.control} name={`medications.${index}.notes`} render={({ field }) => (<FormItem><FormLabel>Notes</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>)} />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground hover:bg-destructive/80 h-6 w-6"><Trash2 className="h-4 w-4" /></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", dosage: "", route: "", time: "", notes: "" })}><PlusCircle className="mr-2 h-4 w-4"/>Add Medication</Button>
                            </CardContent>
                        </Card>
                        <FormField control={form.control} name="medicationAssistance" render={({ field }) => (<FormItem className="space-y-3"><FormLabel>Medication Administration Assistance</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">{['None', 'Some', 'Full'].map(level => (<FormItem key={level} className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value={level} /></FormControl><FormLabel className="font-normal">{`${level} Assistance`}</FormLabel></FormItem>))}</RadioGroup></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="diagnosisAndTreatments" render={({ field }) => (<FormItem><FormLabel>Diagnosis / Current Treatments</FormLabel><FormControl><Textarea placeholder="List current diagnoses and treatments..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="dietaryRestrictions" render={({ field }) => (<FormItem><FormLabel>Dietary Restrictions / Special Diets</FormLabel><FormControl><Textarea placeholder="List any dietary needs..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </TabsContent>
                    
                    <TabsContent value="assessment" className="space-y-6 pt-4">
                        <Card>
                            <CardHeader><CardTitle>Functional Ability Assessment</CardTitle><CardDescription>I=Independent, A=Assistance, D=Dependent</CardDescription></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {functionalAbilityItems.map(item => (
                                    <FormField key={item.id} control={form.control} name={`functionalAbility.${item.id}`} render={({ field }) => (<FormItem><FormLabel>{item.label}</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="I" /></FormControl><FormLabel className="font-normal">I</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="A" /></FormControl><FormLabel className="font-normal">A</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="D" /></FormControl><FormLabel className="font-normal">D</FormLabel></FormItem>
                                    </RadioGroup></FormControl></FormItem>)}/>
                                ))}
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Cognitive & Behavioral Assessment</CardTitle><CardDescription>I=Independent, A=Assistance, D=Dependent</CardDescription></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {cognitiveStatusItems.map(item => (
                                    <FormField key={item.id} control={form.control} name={`cognitiveStatus.${item.id}`} render={({ field }) => (<FormItem><FormLabel>{item.label}</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="I" /></FormControl><FormLabel className="font-normal">I</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="A" /></FormControl><FormLabel className="font-normal">A</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0"><FormControl><RadioGroupItem value="D" /></FormControl><FormLabel className="font-normal">D</FormLabel></FormItem>
                                    </RadioGroup></FormControl></FormItem>)}/>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="authorizations" className="space-y-4 pt-4">
                        <Card>
                            <CardHeader><CardTitle>Authorizations & Directives</CardTitle></CardHeader>
                            <CardContent className="space-y-3">
                                <FormField control={form.control} name="authorizations.fluVaccine" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel>May have annual flu vaccine if not contraindicated.</FormLabel></div></FormItem>)} />
                                <FormField control={form.control} name="authorizations.tuberculinTest" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel>May have annual tuberculin test if not contraindicated.</FormLabel></div></FormItem>)} />
                                <FormField control={form.control} name="authorizations.covidVaccine" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel>May have COVID vaccine if not contraindicated.</FormLabel></div></FormItem>)} />
                                <FormField control={form.control} name="authorizations.dnrDirective" render={({ field }) => (<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-red-50 border-red-200"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange}/></FormControl><div className="space-y-1 leading-none"><FormLabel>Refuse Resuscitation (DNR)</FormLabel><FormDescription>In the event of cardiac or respiratory arrest, I refuse any resuscitation measures.</FormDescription></div></FormItem>)} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                
                <div className="flex justify-end pt-8">
                    <Button type="submit" size="lg" disabled={loading} className="bg-brand-navy hover:bg-brand-navy/90">
                        {loading ? 'Submitting...' : 'Submit Intake Form'}
                    </Button>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}

export default ClientIntakeForm;
