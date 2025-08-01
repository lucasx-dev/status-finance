import { Document, Page, Text, View } from "@react-pdf/renderer";

export const TransactionsPDF = ({ content }) => {
  const lines = content ? content.split("\n") : [];
  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: 20 }}>
          {lines.length > 0 ? (
            lines.map((line, idx) => <Text style={{ padding: 5 }} key={idx}>{line}</Text>)
          ) : (
            <Text>Nenhum conteúdo para exportar.</Text>
          )}
        </View>
      </Page>
    </Document>
  );
};
